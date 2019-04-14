import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/exercise';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private api: string = `${environment.apiUrl}/exerices`;

  constructor(private httpClient: HttpClient) { }

  public getExcerices(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(this.api);
  }
}
