import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingSessionComponent } from './training-session/training-session.component';
import { TrainingListComponent } from './training-list/training-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TrainingListComponent },
  { path: 'session/:trainingId', component: TrainingSessionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
