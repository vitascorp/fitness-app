import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../categories/categories.service';
import { ExercisesService } from '../exercises.service';
import { Exercise } from 'src/app/shared/models/exercise';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  public categories: Category[] = [];
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private exercisesService: ExercisesService) {
      this.form = this.formBuilder.group({
        id: [null],
        categoryId: [null, Validators.required],
        name: [null, Validators.required],
        order: [null, Validators.required]
      });
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      const exerciseId = params.id ? +params.id : null;
      const categoriesObservable = this.categoriesService.getCategories();
      const exerciseObservable = params.id ? this.exercisesService.getExercise(+params.id) : of(new Category());
      forkJoin(categoriesObservable, exerciseObservable)
      .subscribe((result: [Category[], Exercise]) => {
        this.categories = result[0];
        this.setForm(result[1]);
      });
    });
  }

  public save() {
    const exercise = this.form.value as Exercise;
    this.exercisesService.saveExercise(exercise).subscribe((result) => {
      this.form.setValue(result);
      this.back();
    });
  }

  public remove() {
    this.categoriesService.removeCategory(this.form.value.id).subscribe(
      () => this.back()
    );
  }

  public back() {
    this.router.navigate(['settings', 'exercises']);
  }

  private setForm(exercise: Exercise) {
    this.form = this.formBuilder.group({
      id: [exercise.id],
      categoryId: [exercise.categoryId],
      name: [exercise.name, Validators.required],
      order: [exercise.order, Validators.required]
    });
  }
}
