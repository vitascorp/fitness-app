import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private api: string = `${environment.apiUrl}/exercise-categories`;

  constructor() { }
}
