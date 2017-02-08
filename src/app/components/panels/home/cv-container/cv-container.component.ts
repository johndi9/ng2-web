import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { AppState } from '../../../../services/app.service';
import { NotificationService } from '../../../../services/notification.service';

import { STATE_KEYS } from '../../../../variables/variables';

import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'cv-container',
  styleUrls: ['./cv-container.scss'],
  templateUrl: './cv-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvContainer implements OnInit, OnDestroy {
  private optionChangeSubscription: Subscription;
  private tabSelected: number;

  private readonly DEFAULT_OPTION: number = 0;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService,
              private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.updateTabSelection(this.DEFAULT_OPTION);

    this.optionChangeSubscription = this._notificationService.triggerCVOptionChange.subscribe((option) => {
      this.updateTabSelection(option);
      this.updateSwiperSelection(option);
    });
  }

  ngOnDestroy(): void {
    this.optionChangeSubscription.unsubscribe();
  }

  /**
   * Index change based on a swiper action
   * @param index
   */
  private onIndexSwiperChange(option: number) {
    this.updateTabSelection(option);
  }

  /**
   * Update the Swiper selection.
   * This is a hack since input events are still not handled by the ng2-swiper API
   * @param option
   */
  private updateSwiperSelection(option: number): void {
    this._elementRef.nativeElement.getElementsByClassName('swiper-pagination-handle')[option].click();
  }

  /**
   * Update the state/model of the tabs
   * @param option
   */
  private updateTabSelection(option: number): void {
    this.updateTabSelectionState(option);
    this.updateTabSelected(option);
  }

  /**
   * Update tab active state
   * @param option
   */
  private updateTabSelectionState(option: number): void {
    this._appState.set(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED], option);
  }

  /**
   * Update the tab selected to be passed to the CvMenuWrapper
   * @param option
   */
  private updateTabSelected(option: number): void {
    this.tabSelected = option;
  }
}
