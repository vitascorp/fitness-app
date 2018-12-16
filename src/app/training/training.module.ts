import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [TrainingSessionComponent, TrainingSessionExcerciseComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    TrainingRoutingModule
  ]
})
export class TrainingModule { }
