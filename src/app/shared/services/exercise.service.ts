import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/exercise';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private api: string = `${environment.apiUrl}/exercises`;
  private cache$: Observable<Exercise[]>;

  constructor(private httpClient: HttpClient) { }

  public getExcerices(): Observable<Exercise[]> {
    if (!this.cache$) {
      this.cache$ = this.httpClient.get<Exercise[]>(this.api).pipe(
        shareReplay(1)
      );
    }

    return this.cache$;
  }
}
