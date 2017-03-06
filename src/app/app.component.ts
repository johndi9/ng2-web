import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
