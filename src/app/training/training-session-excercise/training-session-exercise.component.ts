import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise';
import { Measure } from 'src/app/shared/models/measure';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { TrainingExercise } from '../models/training-exercise';
import { TrainingExerciseAttempt } from '../models/training-exercise-attempt';
import { TrainingExerciseTitle } from '../models/training-exercise-title';
import { TrainingService } from '../training.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-session-excercise',
  templateUrl: './training-session-excercise.component.html',
  styleUrls: ['./training-session-excercise.component.css']
})
export class TrainingSessionExcerciseComponent implements OnInit {
  @Input() public trainingId: number;
  @Input() public categories: number[];
  @Input() public lastOrder: number;
  @Input() public trainingExercise: TrainingExercise;

  @Output() public updated: EventEmitter<TrainingExercise> = new EventEmitter<TrainingExercise>();
  @Output() public removed: EventEmitter<number> = new EventEmitter<number>();

  @ViewChildren('weightInputs') weightInputs: QueryList<any>;

  public trainingExerciseForm: FormGroup;
  public exerciseTitleForms: FormArray;
  public exerciseAttemptForms: FormArray;

  public exercises: Exercise[];
  public measures: Measure[];
  public message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private exerciseService: ExerciseService,
    private measureService: MeasureService) {
  }

  public ngOnInit() {
    this.exerciseService.getExcerices().subscribe((exercises) => {
      this.exercises = exercises.filter((exercise) => this.categories.indexOf(exercise.categoryId) > -1);
    });
    this.measureService.getMeasures().subscribe((measures) => {
      this.measures = measures;
    });

    this.resetForm();
  }

  public ngAfterViewInit() {
    this.weightInputs.changes.subscribe(
      (weightInputs) => weightInputs.last && weightInputs.last.nativeElement.focus()
    );
  }

  public get isAttemptsSupersetAvailable(): boolean {
    return this.trainingExercise && this.trainingExercise.titles.length < 2;
  }

  public addExerciseTitle() {
    const newExerciseTitle = new TrainingExerciseTitle(null, null, this.exerciseTitleForms.length);
    const newExerciseTitleForm = this.getExerciseTitleForm(newExerciseTitle);
    this.exerciseTitleForms.push(newExerciseTitleForm);
  }

  public removeExerciseTitle(index: number) {
    const removeExerciseTitle = this.exerciseTitleForms.value[index];
    this.exerciseTitleForms.removeAt(removeExerciseTitle);
  }

  public addExerciseAttempt() {
    let supersetOrderCount = 0;
    const lastAttempt = this.exerciseAttemptForms && this.exerciseAttemptForms.value.length
      ? this.exerciseAttemptForms.value[this.exerciseAttemptForms.length - 1]
      : null;

    const newAttemptWeight = lastAttempt ? lastAttempt.weight : null;
    const newAttemptAmount = lastAttempt ? lastAttempt.amount : null;
    const newAttemptOrder = lastAttempt ? lastAttempt.order + 1 : 0;

    while (supersetOrderCount < this.trainingExercise.titles.length) {
      const newExerciseAttempt = new TrainingExerciseAttempt(null, newAttemptWeight, newAttemptAmount, newAttemptOrder, supersetOrderCount);
      const newExerciseAttemptForm = this.getExerciseAttemptForm(newExerciseAttempt);
      this.exerciseAttemptForms.push(newExerciseAttemptForm);

      supersetOrderCount++;
    }
  }

  public addDropsetExerciseAttempt() {
    const attemptsCount = this.exerciseAttemptForms.value.length;
    const lastAttempt = this.exerciseAttemptForms.value[attemptsCount - 1];
    const lastSupersetOrder = lastAttempt.supersetOrder;

    const newExerciseAttempt = new TrainingExerciseAttempt(null, null, null, lastAttempt.order, lastSupersetOrder + 1);
    const newExerciseAttemptForm = this.getExerciseAttemptForm(newExerciseAttempt);
    this.exerciseAttemptForms.push(newExerciseAttemptForm);
  }

  public removeExerciseAttempt(order: number) {
    const removeExerciseAttempts = this.exerciseAttemptForms.value.filter((attemptForm) => attemptForm.order === order);
    removeExerciseAttempts.forEach((removeExerciseAttempt) => {
      this.exerciseAttemptForms.removeAt(removeExerciseAttempt);
    });

    this.exerciseAttemptForms.value.forEach((attempt, index) => {
      attempt.order = index;
    });
  }

  public saveTrainingExercise() {
    if (!this.trainingExercise) {
      this.trainingExerciseForm.patchValue({order: this.lastOrder + 1});
    }

    this.trainingService.saveTrainingExercise(this.trainingId, this.trainingExerciseForm.value)
      .subscribe((trainingExercise) => {
        this.updated.emit(trainingExercise);
        this.resetForm();
        this.message = 'Успішно збережено';
      });
  }

  public removeTrainingExercise() {
    this.trainingService.deleteTrainingExercise(this.trainingExerciseForm.value.id).subscribe(() => {
      this.removed.emit(this.trainingExerciseForm.value.id);
      this.message = "Успішно видалено";
    });
  }

  private resetForm() {
    this.trainingExerciseForm = this.getExerciseForm(this.trainingExercise);
    this.exerciseTitleForms = this.trainingExerciseForm.get('titles') as FormArray;
    this.exerciseAttemptForms = this.trainingExerciseForm.get('attempts') as FormArray;
  }

  private updateTrainingExerciseForm(exercise: TrainingExercise) {
    const exerciseTitleForms = this.getExerciseTitleForms(exercise.titles);
    const exerciseAttemptForms = this.getExerciseAttemptForms(exercise.attempts);

    this.trainingExerciseForm.patchValue({
      id: exercise.id,
      order: exercise.order
    });

    this.trainingExerciseForm.setControl('titles', exerciseTitleForms);
    this.trainingExerciseForm.setControl('attempts', exerciseAttemptForms);
  }

  private getExerciseForm(exercise: TrainingExercise): FormGroup {
    const exerciseTitles = exercise ? exercise.titles : [];
    const addExtraTitle = !exerciseTitles.length;
    const exerciseTitleForms = this.getExerciseTitleForms(exerciseTitles, addExtraTitle);

    const exerciseAttempts = exercise ? exercise.attempts : [];
    const addExtraAttempt = exercise && exercise.id && !exerciseAttempts.length;
    const exerciseAttemptForms = this.getExerciseAttemptForms(exerciseAttempts, addExtraAttempt);

    return this.formBuilder.group({
      id: [exercise ? exercise.id : null],
      order: [exercise ? exercise.order : null],
      titles: exerciseTitleForms,
      attempts: exerciseAttemptForms
    });
  }

  private getExerciseTitleForms(exerciseTitles: TrainingExerciseTitle[], addExtraTitle?: boolean): FormArray {
    const exerciseTitleForms = this.formBuilder.array([]);

    exerciseTitles.forEach((exerciseTitle) => {
      const excerciseTitleForm = this.getExerciseTitleForm(exerciseTitle);
      exerciseTitleForms.push(excerciseTitleForm);
    });

    if (addExtraTitle) {
      const additionalExerciseTitle = new TrainingExerciseTitle(null, null, 0);
      const additionalExerciseTitleForm = this.getExerciseTitleForm(additionalExerciseTitle);
      exerciseTitleForms.push(additionalExerciseTitleForm);
    }

    return exerciseTitleForms;
  }

  private getExerciseTitleForm(exerciseTitle: TrainingExerciseTitle): FormGroup  {
    return this.formBuilder.group({
      exerciseId: [exerciseTitle ? exerciseTitle.exerciseId : null],
      measureId: [exerciseTitle ? exerciseTitle.measureId : null],
      supersetOrder: [exerciseTitle ? exerciseTitle.supersetOrder : null]
    });
  }

  private getExerciseAttemptForms(exerciseAttemps: TrainingExerciseAttempt[], addExtraAttempt?: boolean): FormArray {
    const exerciseAttemptForms = this.formBuilder.array([]);

    exerciseAttemps.forEach((exerciseAttempt) => {
      const exerciseAttemptForm = this.getExerciseAttemptForm(exerciseAttempt);
      exerciseAttemptForms.push(exerciseAttemptForm);
    });

    if (addExtraAttempt) {
      const lastOrder = this.exerciseAttemptForms && this.exerciseAttemptForms.value.length
        ? this.exerciseAttemptForms.value[this.exerciseAttemptForms.length - 1].order
        : -1;

      let supersetOrderCount = 0;
      while (supersetOrderCount < this.trainingExercise.titles.length) {
        const newExerciseAttempt = new TrainingExerciseAttempt(null, null, null, lastOrder + 1, supersetOrderCount);
        const newExerciseAttemptForm = this.getExerciseAttemptForm(newExerciseAttempt);
        exerciseAttemptForms.push(newExerciseAttemptForm);

        supersetOrderCount++;
      }
    }

    return exerciseAttemptForms;
  }

  private getExerciseAttemptForm(exerciseAttempt: TrainingExerciseAttempt): FormGroup  {
    return this.formBuilder.group({
      id: [exerciseAttempt ? exerciseAttempt.id : null],
      weight: [exerciseAttempt ? exerciseAttempt.weight : null],
      amount: [exerciseAttempt ? exerciseAttempt.amount : null],
      order: [exerciseAttempt ? exerciseAttempt.order : null],
      supersetOrder: [exerciseAttempt ? exerciseAttempt.supersetOrder : null]
    });
  }
}