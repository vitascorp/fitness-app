import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-session',
  templateUrl: './training-session.component.html',
  styleUrls: ['./training-session.component.scss']
})
export class TrainingSessionComponent implements OnInit {
  public categories = [
    {id: 1, text: 'Hands'},
    {id: 2, text: 'Legs'},
    {id: 3, text: 'Shoulders'}
  ];

  public exercises = [
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
