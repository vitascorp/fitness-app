import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from './models/training';
import { TrainingExercise } from './models/training-exercise';
import { TrainingExerciseAttempt } from './models/training-exercise-attempt';
import { TrainingCardio } from './models/training-cardio';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private api: string = `${environment.apiUrl}/trainings`;

  constructor(private httpClient: HttpClient) { }

  public getTrainings(): Observable<Training[]> {
    this.httpClient.get(this.api).subscribe(t => {
      var g = t;
    }, err => {
      console.log(err);
    });
    return this.httpClient.get<Training[]>(this.api);
  }

  public getTraining(id: number): Observable<Training> {
    const url = `${this.api}/${id}`;
    return this.httpClient.get<Training>(url);
  }

  public saveTraining(model: Training): Observable<Training> {
    return this.httpClient.post<Training>(this.api, model);
  }

  public deleteTraining(id: number): Observable<any> {
    const url = `${this.api}/${id}`;
    return this.httpClient.delete(url);
  }

  public saveTrainingCardio(trainingId: number, model: TrainingCardio): Observable<TrainingCardio> {
    const url = `${this.api}/${trainingId}/cardio`;
    return this.httpClient.post<TrainingCardio>(url, model);
  }

  public deleteTrainingCardio(id: number): Observable<any> {
    const url = `${this.api}/cardio/${id}`;
    return this.httpClient.delete(url);
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
