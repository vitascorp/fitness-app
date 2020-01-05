import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api: string = `${environment.apiUrl}/categories`;
  private cache$: Observable<Category[]>;

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    if (!this.cache$) {
      this.cache$ = this.httpClient.get<Category[]>(this.api).pipe(
        shareReplay(1)
      );
    }

    return this.cache$;
  }

  public clearCache(){
    this.cache$ = null;
  }
}
