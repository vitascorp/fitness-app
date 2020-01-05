import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/shared/services/category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api: string = `${environment.apiUrl}/categories`;

  constructor(private httpClient: HttpClient, private sharedCategoryService: CategoryService) { }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.api);
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.api}/${categoryId}`);
  }

  public saveCategory(category: Category): Observable<Category> {
    this.sharedCategoryService.clearCache();
    return this.httpClient.post<Category>(this.api, category);
  }

  public removeCategory(categoryId: number): Observable<any> {
    this.sharedCategoryService.clearCache();
    return this.httpClient.delete(`${this.api}/${categoryId}`);
  }
}
