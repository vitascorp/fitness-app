import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div class='container-fluid' class='main-container'><router-outlet></router-outlet></div>`,
  styles: [`.main-container { margin:0 20px }`]
})
export class AppComponent {
  title = 'fitness-app';
}
