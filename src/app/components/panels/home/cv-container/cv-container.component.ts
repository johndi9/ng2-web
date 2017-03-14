import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';

import { AppState } from '../../../../services/app.service';
import { CurriculumService } from '../../../../services/curriculum.service';
import { NotificationService } from '../../../../services/notification.service';
import { ResizeService } from '../../../../services/resize.service';

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
  @Input() isMediumUpView: boolean;
  @Input() typeModalOpened: CV_OPTION_TYPES;

  private optionChangeSubscription: Subscription;

  private tabSelected: number;
  private cvTabSelected = CV_OPTION_TYPES;
  private slideToLeft: boolean;

  private readonly DEFAULT_OPTION: number = 0;
  private readonly SIDEBAR_MAX_WIDTH: string = '320px';

  constructor(private _appState: AppState,
              private _notificationService: NotificationService,
              private _curriculumService: CurriculumService,
              private _resizeService: ResizeService,
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
    this.updateIfSlideToLeft(option);
    this.updateTabSelectionState(option);
    this.updateTabSelected(option);
  }

  /**
   * Identify if the user has selected a left or right option in order to show different animations
   * @param option
   */
  private updateIfSlideToLeft(option: number): void {
    this.slideToLeft = option < this._appState.get(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED]);
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
