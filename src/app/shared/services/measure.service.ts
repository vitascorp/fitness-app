import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Measure } from '../models/measure';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  private api: string = `${environment.apiUrl}/measures`;
  private cache$: Observable<Measure[]>;

  constructor(private httpClient: HttpClient) { }

  public getMeasures(): Observable<Measure[]> {
    if (!this.cache$) {
      this.cache$ = this.httpClient.get<Measure[]>(this.api).pipe(
        shareReplay(1)
      );
    }

    return this.cache$;
  }
}
