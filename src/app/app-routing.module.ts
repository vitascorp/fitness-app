import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateSessionComponent } from './date-session/date-session.component';

const routes: Routes = [
  { path: '', redirectTo: '/date-session', pathMatch: 'full' },
  { path: 'date-session', component: DateSessionComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
