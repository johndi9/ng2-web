import { Action } from '@ngrx/store';

import { SCREEN_TYPES } from '../variables/variables';
import { GlobalActions } from '../actions/global-actions';

export interface State {
  screenType: SCREEN_TYPES;
}

const INIT_STATE: State = {
  screenType: null
};

export const global = (state: State = INIT_STATE, action: Action): State => {

  switch (action.type) {
    case GlobalActions.RESIZE_SCREEN:
      const screen: number = action.payload;
      return Object.assign({}, state, { screenType: screen });

    default:
      return state;
  }

};
