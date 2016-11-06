import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../assets/scss/index.scss', './app.scss'],
  templateUrl: './app.html'
})

export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {
  }

}
