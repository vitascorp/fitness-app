import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TrainingService } from '../training.service';
import { TrainingCardio } from '../models/training-cardio';

@Component({
  selector: 'app-training-cardio',
  templateUrl: './training-cardio.component.html',
  styleUrls: ['./training-cardio.component.scss']
})
export class TrainingCardioComponent implements OnInit {
  @Input() public trainingId: number;
  @Input() public trainingCardio: TrainingCardio;

  public trainingCardioForm: FormGroup;

  constructor(
    private trainingService: TrainingService,
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.resetForm(this.trainingCardio);
  }

  public saveTrainingCardio() {
    const model = this.trainingCardioForm.value;
    this.trainingService.saveTrainingCardio(this.trainingId, model).subscribe((trainingCardio) => {
      this.trainingCardio = trainingCardio;
      this.resetForm(trainingCardio);
    });
  }

  public removeTrainingCardio() {
    this.trainingService.deleteTrainingCardio(this.trainingCardioForm.value.id).subscribe(() => {
      this.trainingCardio = null;
      this.resetForm(null);
    });
  }

  private resetForm(trainingCardio: TrainingCardio) {
    this.trainingCardioForm = this.formBuilder.group({
      id: [trainingCardio ? trainingCardio.id : null],
      angle: [trainingCardio ? trainingCardio.angle : null],
      speed: [trainingCardio ? trainingCardio.speed : null],
      time: [trainingCardio ? trainingCardio.time : null]
    });
  }
}
