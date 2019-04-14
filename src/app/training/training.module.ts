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
import { TrainingSessionExcerciseComponent } from './training-session/training-session-excercise/training-session-exercise.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TrainingSessionComponent, TrainingSessionExcerciseComponent],
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
