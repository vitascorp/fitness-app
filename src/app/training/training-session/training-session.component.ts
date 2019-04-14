import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Exercise } from 'src/app/shared/models/exercise';
import { Measure } from 'src/app/shared/models/measure';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { forkJoin } from 'rxjs';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TrainingService } from '../training.service';

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

  public trainingForm: FormGroup;

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
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private measureService: MeasureService,
    private trainingService: TrainingService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      id: [0],
      date: [new Date()],
      categoryId: [0]
    });

    const categoriesSub = this.categoryService.getCategories();
    const exercisesSub = this.exerciseService.getExcerices();
    const measureItemsSub = this.measureService.getMeasureItems();

    forkJoin(categoriesSub, exercisesSub, measureItemsSub)
    .subscribe((data) => {
       this.categories = data[0];
       this.exercises = data[1];
       this.measureItems = data[2];
      });
  }

  public saveTrainingSession() {
    const model = this.trainingForm.value;
    this.trainingService.saveTraining(model).subscribe((data) => {
      this.trainingForm.setValue(data);
      this.message = 'Successfully saved';
    });
  }
}
