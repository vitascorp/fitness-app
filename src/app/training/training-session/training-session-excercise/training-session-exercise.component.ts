import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-training-session-excercise',
  templateUrl: './training-session-excercise.component.html',
  styleUrls: ['./training-session-excercise.component.css']
})
export class TrainingSessionExcerciseComponent implements OnInit {
  @Input() public exercise: number;

  public exerciseNames = [
    {id: 1, text: 'Exercise 1'},
    {id: 2, text: 'Exercise 2'},
    {id: 3, text: 'Exercise 3'}
  ];

  public measurements = [
    {id: 1, text: 'Kilogrammes'},
    {id: 2, text: 'Pounds'}
  ];

  public attempts = [
    1,
    2,
    3,
    4,
    5
  ];

  constructor() { }

  ngOnInit() {
  }

}
