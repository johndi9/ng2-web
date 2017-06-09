import { Injectable } from '@angular/core';
import { HomeActions } from '../actions/home-actions';
import { Actions, Effect } from '@ngrx/effects';
import { Curriculum } from '../models/Curriculum/Curriculum';
import { CurriculumService } from '../services/curriculum.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HomeEffects {

  @Effect()
  loadCV$ = this.actions$
    .ofType(HomeActions.LOAD_CV)
    .switchMap(_ => this._curriculum.getCurriculum(this._translate.currentLang))
    .map((cv: Curriculum) => ({
      type: HomeActions.LOAD_CV_SUCCESS,
      payload: {
        cv: cv,
        lan: this._translate.currentLang
      }
    }));

  constructor(private actions$: Actions,
              private _curriculum: CurriculumService,
              private _translate: TranslateService) {
  }
}
