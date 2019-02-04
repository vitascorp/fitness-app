import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatGridListModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { CategoriesComponent } from './settings/categories/categories.component';
import { CategoryComponent } from './settings/categories/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './settings/categories/categories.service';
import { ExercisesComponent } from './settings/exercises/exercises.component';
import { ExerciseComponent } from './settings/exercises/exercise/exercise.component';
import { ExercisesService } from './settings/exercises/exercises.service';

@NgModule({
  declarations: [CategoriesComponent, SettingsComponent, CategoryComponent, ExercisesComponent, ExerciseComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    SettingsRoutingModule
  ],
  providers: [
    CategoriesService,
    ExercisesService
  ]
})
export class SettingsModule { }
