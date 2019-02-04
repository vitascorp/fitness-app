import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'training', pathMatch: 'full' },
  { path: 'training', loadChildren: './training/training.module#TrainingModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
