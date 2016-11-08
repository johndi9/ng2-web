import { Component } from '@angular/core';


@Component({
  selector: 'loading-screen',
  styleUrls: ['./loading-screen.scss'],
  templateUrl: './loading-screen.html'
})

export class LoadingScreen {
  showModal: boolean = false;

  constructor() {}
}
