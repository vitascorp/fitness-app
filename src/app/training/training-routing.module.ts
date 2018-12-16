import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingSessionComponent } from './training-session/training-session.component';

const routes: Routes = [
  { path: '', redirectTo: 'session', pathMatch: 'full' },
  { path: 'session', component: TrainingSessionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
