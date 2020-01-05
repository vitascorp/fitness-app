import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Exercise } from 'src/app/shared/models/exercise';
import { Measure } from 'src/app/shared/models/measure';
import { CategoryService } from 'src/app/shared/services/category.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TrainingService } from '../training.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from '../models/training';
import { TrainingExercise } from '../models/training-exercise';

@Component({
  selector: 'app-training-session',
  templateUrl: './training-session.component.html',
  styleUrls: ['./training-session.component.scss']
})
export class TrainingSessionComponent implements OnInit {

  public categories: Category[];
  public exercises: Exercise[];
  public measureItems: Measure[];
  public message: string;
  public training: Training;
  public generalCategory: Category;

  public trainingForm: FormGroup;

  public isCardioShown: boolean = false;

  public get categoryTitle(): string {
    return this.categories ? 'Категорії' : 'Завантаження';
  }

  public get excerciseTitle(): string {
    return this.categories ? 'Вправи' : 'Завантаження';
  }

  public get measureTitle(): string {
    return this.categories ? 'Вимірювання' : 'Завантаження';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private trainingService: TrainingService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      id: [null],
      date: [new Date()],
      categoryId: [null],
      weight: null
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.generalCategory = categories.filter(c => c.order === 0)[0]; //General category has order equals 0 by convention
    });

    this.route.params.subscribe((params) => {
      const trainingId = params.trainingId;
      if (!params.trainingId) {
        return;
      }

      this.trainingService.getTraining(trainingId).subscribe((training) => {
        this.training = training;
        this.updateTrainingForm(training);
      });
    });
  }

  public showTrainingCardio() {
    this.isCardioShown = true;
  }

  public saveTrainingSession() {
    const model = this.trainingForm.value;
    model.date = this.toSimpleDate(model.date);
    this.trainingService.saveTraining(model).subscribe((training) => {
      this.training = training;
      this.updateTrainingForm(training);
      this.message = 'Successfully saved';
    });
  }

  public removeTrainingSession() {
    this.trainingService.deleteTraining(this.trainingForm.value.id).subscribe(() => {
      this.router.navigate(['/training/list']);
    });
  }

  public back() {
    this.router.navigate(['training', 'list']);
  }

  public getLastOrder(): number {
    return this.training && this.training.exercises.length ?
      this.training.exercises[this.training.exercises.length - 1].order
      : -1;
  }

  public onUpdatedTrainingExercise(trainingExercise: TrainingExercise) {
    let index = -1;
    this.training.exercises.forEach((e, i) => {
      if (e.id === trainingExercise.id) {
        index = i;
      }
    });

    if (index > -1) {
      this.training.exercises[index] = trainingExercise;
    } else {
      this.training.exercises.push(trainingExercise);
    }
  }

  public onRemovedTrainingExercise(trainingExerciseId: number) {
    this.training.exercises = this.training.exercises
      .filter((trainingExercise) => trainingExercise.id !== trainingExerciseId);
  }

  private updateTrainingForm(training: Training) {
    this.trainingForm.patchValue({
      id: training.id,
      date: training.date,
      categoryId: training.categoryId,
      weight: training.weight
    });
  }

  private toSimpleDate(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return new Date(year, month, day);
  }
}
