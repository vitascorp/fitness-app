import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService) {
      this.form = this.formBuilder.group({
        id: [null],
        name: [null, Validators.required],
        order: [null, Validators.required]
      });
  }

  public ngOnInit() {
    this.route.params.subscribe((params) => {
      const categoryId = params.id ? +params.id : null;
      this.categoriesService.getCategory(categoryId).subscribe((category) => this.setForm(category));
    });
  }

  public save() {
    const category = this.form.value as Category;
    this.categoriesService.saveCategory(category).subscribe((result) =>
      this.form.setValue(result)
    );
  }

  public remove() {
    this.categoriesService.removeCategory(this.form.value.id).subscribe(
      () => this.back()
    );
  }

  public back() {
    this.router.navigate(['settings', 'categories']);
  }

  private setForm(category: Category) {
    this.form = this.formBuilder.group({
      id: [category.id],
      name: [category.name, Validators.required],
      order: [category.order, Validators.required]
    });
  }
}
