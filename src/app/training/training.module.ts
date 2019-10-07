import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatInputModule,
  MatGridListModule,
  MatIconModule
} from '@angular/material';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingSessionComponent } from './training-session/training-session.component';
import { TrainingCardioComponent } from './training-cardio/training-cardio.component';
import { TrainingSessionExcerciseComponent } from './training-session-excercise/training-session-exercise.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingListComponent } from './training-list/training-list.component';

@NgModule({
  declarations: [
    TrainingSessionComponent,
    TrainingCardioComponent,
    TrainingSessionExcerciseComponent,
    TrainingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    TrainingRoutingModule,
    SharedModule
  ]
})
export class TrainingModule { }
