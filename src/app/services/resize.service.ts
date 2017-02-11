import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class ResizeService {
  resizeChange: Observable<boolean>;

  constructor() {
    const screenHasResized = new BehaviorSubject(this.isMediumUpVisibleFn());

    this.resizeChange = <Observable<boolean>>screenHasResized.pluck('isMediumUpVisible').distinctUntilChanged();
    Observable.fromEvent(window, 'resize').map(this.isMediumUpVisibleFn).subscribe(screenHasResized);
  }

  /**
   * Detect when we pass from SM -> MD & MD -> SM
   * @returns {{isMediumUpVisible: boolean}}
   */
  private isMediumUpVisibleFn(): { isMediumUpVisible: boolean } {
    return {
      isMediumUpVisible: window.getComputedStyle(window.document.getElementById('visible-md-up')).display !== 'none'
    };
  }
}

