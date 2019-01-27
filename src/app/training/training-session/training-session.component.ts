import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-training-session',
  templateUrl: './training-session.component.html',
  styleUrls: ['./training-session.component.scss']
})
export class TrainingSessionComponent implements OnInit {
  public categories: Category[];

  public get categoryTitle(): string {
    return this.categories ? 'Категорії' : 'Завантаження';
  }

  public exercises = [
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
