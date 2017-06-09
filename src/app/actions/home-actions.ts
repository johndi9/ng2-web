import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TAB_OPTIONS } from '../variables/variables';


@Injectable()
export class HomeActions {
  static LOAD_CV = 'CV json init load';
  static LOAD_CV_SUCCESS = 'CV json loaded';
  static CHANGE_TAB = 'Tab selected';
  static OPEN_MODAL = 'Modal opened';
  static CLOSE_MODAL = 'Modal closed';

  constructor(private store: Store<any>) {
  }

  loadCV(lan: string) {
    this.store.dispatch({
      type: HomeActions.LOAD_CV,
      payload: lan
    });
  }

  changeTab(tabId: TAB_OPTIONS) {
    this.store.dispatch({
      type: HomeActions.CHANGE_TAB,
      payload: tabId
    });
  }

  openModal(modalId: number, modalType: TAB_OPTIONS) {
    this.store.dispatch({
      type: HomeActions.OPEN_MODAL,
      payload: { index: modalId, type: modalType }
    });
  }

  closeModal(modalId: number) {
    this.store.dispatch({
      type: HomeActions.CLOSE_MODAL,
      payload: modalId
    });
  }
}
