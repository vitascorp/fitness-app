import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Measure } from '../models/measure';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  private api: string = `${environment.apiUrl}/measure-items`;

  constructor(private httpClient: HttpClient) { }

  public getMeasureItems(): Observable<Measure[]> {
    return this.httpClient.get<Measure[]>(this.api);
  }
}
