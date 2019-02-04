import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Exercise } from 'src/app/shared/models/exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private api: string = `${environment.apiUrl}/exercises`;

  constructor(private httpClient: HttpClient) { }

  public getExercies(): Observable<Exercise[]> {
    return this.httpClient.get<Exercise[]>(this.api);
  }

  public getExercise(exeriseId: number): Observable<Exercise> {
    return this.httpClient.get<Exercise>(`${this.api}/${exeriseId}`);
  }

  public saveExercise(exercise: Exercise): Observable<Exercise> {
    return this.httpClient.post<Exercise>(this.api, exercise);
  }

  public removeExercise(exerciseId: number): Observable<any> {
    return this.httpClient.delete(`${this.api}/${exerciseId}`);
  }
}
