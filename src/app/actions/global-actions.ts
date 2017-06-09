import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SCREEN_TYPES } from '../variables/variables';

@Injectable()
export class GlobalActions {
  static RESIZE_SCREEN = 'Resize to a different screen type';

  constructor(private store: Store<any>) {
  }

  resizeScreen(screenType: SCREEN_TYPES) {
    this.store.dispatch({
      type: GlobalActions.RESIZE_SCREEN,
      payload: screenType
    });
  }
}
