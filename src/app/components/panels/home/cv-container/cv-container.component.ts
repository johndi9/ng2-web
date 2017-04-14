import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';

import { AppState } from '../../../../services/app.service';
import { NotificationService } from '../../../../services/notification.service';

import { Curriculum } from '../../../../models/Curriculum/Curriculum';

import { Subscription } from 'rxjs/Rx';

import { STATE_KEYS, CV_OPTION_TYPES } from '../../../../variables/variables';


@Component({
  selector: 'cv-container',
  styleUrls: ['./cv-container.scss'],
  templateUrl: './cv-container.html'
})

export class CvContainer implements OnInit, OnDestroy {
  @Input() curriculum: Curriculum;
  @Input() typeScreen: number;

  private optionChangeSubscription: Subscription;

  tabSelected: number;
  bgClass: string;

  private readonly DEFAULT_OPTION: number = 0;
  readonly SIDEBAR_MAX_WIDTH: string = '320px';

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
  onIndexSwiperChange(option: number) {
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
    this.updateBgColor(option);
    this.resetScroll();
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

  /**
   * Update background color for the tab containers + sidebar
   * @param option
   */
  private updateBgColor(option: number): void {
    switch (option) {
      case CV_OPTION_TYPES.PROJECTS:
      case CV_OPTION_TYPES.EMPLOYS:
      case CV_OPTION_TYPES.EDUCATION:
      case CV_OPTION_TYPES.OTHER_INFO:
        this.bgClass = 'grey';
        break;
      default:
        this.bgClass = 'white';
    }
  }

  private resetScroll(): void {
    this._elementRef.nativeElement.querySelector('.swiper-container').scrollTop = 0;
  }

}
