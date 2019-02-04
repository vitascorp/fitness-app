import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise';
import { Router } from '@angular/router';
import { ExercisesService } from './exercises.service';
import { forkJoin } from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  public categories: Category[] = [];
  public exercises: Exercise[] = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private exercisesService: ExercisesService) {
  }

  public ngOnInit() {
    forkJoin([
      this.categoriesService.getCategories(),
      this.exercisesService.getExercies()
    ]).subscribe((result: [Category[], Exercise[]]) => {
      this.categories = result[0];
      this.exercises = result[1];
    });
  }

  public getCategoryExercises(categoryId: number): Exercise[] {
    return this.exercises.filter((e) => e.categoryId === categoryId);
  }

  public navigate(exerciseId?: number) {
    this.router.navigate(['settings', 'exercises', exerciseId ? exerciseId : '' ]);
  }
}
