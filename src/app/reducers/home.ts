import { Action } from '@ngrx/store';

import { HomeActions } from '../actions/home-actions';

import { Curriculum } from '../models/Curriculum/Curriculum';


export interface State {
  cvs: { [lan: string]: Curriculum };
  tabSelected: number;
  modalOpened: { index: number, type: number };
}

const INIT_STATE: State = {
  cvs: {},
  tabSelected: 0,
  modalOpened: {
    index: null,
    type: null
  }
};

function loadCV(cvs: { [lan: string]: Curriculum }, newCV: Curriculum, lan: string) {
  if (!cvs[lan]) {
    cvs[lan] = newCV;
  }
  return cvs;
}

export const home = (state: State = INIT_STATE, action: Action): State => {

  switch (action.type) {
    case HomeActions.LOAD_CV_SUCCESS:
      const cv: Curriculum = action.payload.cv;
      const language: string = action.payload.lan;
      return Object.assign({}, state, { cvs: loadCV(state.cvs, cv, language) });

    case HomeActions.CHANGE_TAB:
      const tabIndex: number = action.payload;
      return Object.assign({}, state, { tabSelected: tabIndex });

    case HomeActions.OPEN_MODAL:
      const modalIndex: number = action.payload.index;
      const modalType: number = action.payload.type;
      return Object.assign({}, state, { modalOpened: { index: modalIndex, type: modalType } });

    case HomeActions.CLOSE_MODAL:
      return Object.assign({}, state, { modalOpened: { index: null, type: null } });

    default:
      return state;
  }

};
