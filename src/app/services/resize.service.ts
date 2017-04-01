import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { SCREEN_TYPES } from '../variables/variables';


@Injectable()
export class ResizeService {
  resizeChange: Observable<number>;

  constructor() {
    const screenHasResized = new BehaviorSubject(this.typeScreenVisibleFn());

    this.resizeChange = <Observable<number>>screenHasResized.pluck('typeScreenVisible').distinctUntilChanged();
    Observable.fromEvent(window, 'resize').map(this.typeScreenVisibleFn.bind(this)).subscribe(screenHasResized);
  }

  /**
   * Detect when we pass between SM, MD & LG screens
   * @returns {{typeScreenVisible: boolean}}
   */
  private typeScreenVisibleFn(): { typeScreenVisible: number } {
    return {
      typeScreenVisible: this.getTypeScreenVisible()
    };
  }
  
  private getTypeScreenVisible(): number {
    if (window.getComputedStyle(window.document.getElementById('sm-visible')).display !== 'none') {
      return SCREEN_TYPES.MOBILE;
    } else if (window.getComputedStyle(window.document.getElementById('md-visible')).display !== 'none') {
      return SCREEN_TYPES.TABLET;
    } else if (window.getComputedStyle(window.document.getElementById('lg-visible')).display !== 'none') {
      return SCREEN_TYPES.DESKTOP;
    }
  }
}

