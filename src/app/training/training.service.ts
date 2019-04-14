import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Training } from './training-session/training-session-excercise/models/training';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrainingExercise } from './training-session/training-session-excercise/models/training-exercise';
import { TrainingExerciseAttempt } from './training-session/training-session-excercise/models/training-exercise-attempt';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private api: string = `${environment.apiUrl}/trainings`;

  constructor(private httpClient: HttpClient) { }

  public getTrainings(): Observable<Training[]> {
    return this.httpClient.get<Training[]>(this.api);
  }

  public getTraining(id: number): Observable<Training> {
    const url = `${this.api}/${id}`;
    return this.httpClient.get<Training>(url);
  }

  public saveTraining(model: Training): Observable<Training> {
    return this.httpClient.post<Training>(this.api, model);
  }

  public saveTrainingExercise(trainingId: number, model: TrainingExercise): Observable<TrainingExercise> {
    const url = `${this.api}/${trainingId}/exercises`;
    return this.httpClient.post<TrainingExercise>(url, model);
  }

  public deleteTrainingExercise(id: number): Observable<any> {
    const url = `${this.api}/exercises/${id}`;
    return this.httpClient.delete(url);
  }

  public saveTrainingExerciseAttempt(trainingExcerciseId: number, model: TrainingExerciseAttempt)
    : Observable<TrainingExerciseAttempt> {
    const url = `${this.api}/exercises/${trainingExcerciseId}/attempts`;
    return this.httpClient.post<TrainingExerciseAttempt>(url, model);
  }

  public deleteTrainingExerciseAttempt(id: number): Observable<any> {
    const url = `${this.api}/exercises/attempts/${id}`;
    return this.httpClient.delete(url);
  }
}
