import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private api: string = `${environment.apiUrl}/categories`;

  constructor() { }
}
