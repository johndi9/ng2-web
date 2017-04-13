import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Separate CSS file to be loaded before angular2 is init
require('../assets/scss/initial.scss');

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../assets/scss/index.scss', './app.scss'],
  templateUrl: './app.html'
})

export class AppComponent {

  constructor(private _translate: TranslateService) {
    _translate.setDefaultLang('en');
    _translate.use('en');
  }

}
