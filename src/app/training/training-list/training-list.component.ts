import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService } from '../training.service';
import { Training } from '../models/training';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {
  public trainings: Training[] = [];

  constructor(
    private router: Router,
    private trainingService: TrainingService) { }

  public ngOnInit() {
    this.trainingService.getTrainings().subscribe((trainings) =>
      this.trainings = trainings
    , (error) => {
      console.log(error);
    });
  }

  public navigate(trainingId?: number) {
    this.router.navigate(['training', 'session', trainingId ? trainingId : '']);
  }
}
