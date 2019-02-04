import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories: Category[] = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService) {
  }

  public ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) =>
      this.categories = categories
    );
  }

  public navigate(categoryId?: number) {
    this.router.navigate(['settings', 'categories', categoryId ? categoryId : '']);
  }
}
