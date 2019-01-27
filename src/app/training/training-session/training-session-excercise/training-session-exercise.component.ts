import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-training-session-excercise',
  templateUrl: './training-session-excercise.component.html',
  styleUrls: ['./training-session-excercise.component.css']
})
export class TrainingSessionExcerciseComponent implements OnInit {
  @Input() public exercise: number;

  public categories: Category[];

  public measurements = [
    {id: 1, text: 'Kilogrammes'},
    {id: 2, text: 'Pounds'}
  ];

  public attempts = [
    1,
    2,
    3,
    4,
    5
  ];

  constructor(private categoryService: CategoryService) { }

  public ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => this.categories = categories);
  }

}
