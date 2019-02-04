import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './settings/categories/categories.component';
import { SettingsComponent } from './settings/settings.component';
import { CategoryComponent } from './settings/categories/category/category.component';
import { ExercisesComponent } from './settings/exercises/exercises.component';
import { ExerciseComponent } from './settings/exercises/exercise/exercise.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'exercises/:id', component: ExerciseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
