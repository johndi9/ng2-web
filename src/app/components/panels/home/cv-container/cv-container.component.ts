import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { AppState } from '../../../../services/app.service';
import { CurriculumService } from '../../../../services/curriculum.service';
import { NotificationService } from '../../../../services/notification.service';

import { Curriculum } from '../../../../models/Curriculum/Curriculum';

import { STATE_KEYS, CV_OPTION_TYPES } from '../../../../variables/variables';

import { Subscription } from 'rxjs/Rx';
import { ResizeService } from '../../../../services/resize.service';


@Component({
  selector: 'cv-container',
  styleUrls: ['./cv-container.scss'],
  templateUrl: './cv-container.html'
})

export class CvContainer implements OnInit, OnDestroy {
  private optionChangeSubscription: Subscription;
  private curriculumLoadedSubscription: Subscription;
  private resizeChangeSubscription: Subscription;
  private modalOpenedSubscription: Subscription;
  private tabSelected: number;
  private curriculum: Curriculum;
  private isMediumUpView: boolean;
  private typeModalOpened: CV_OPTION_TYPES;
  private cvTabSelected = CV_OPTION_TYPES;

  private readonly DEFAULT_OPTION: number = 0;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService,
              private _curriculumService: CurriculumService,
              private _resizeService: ResizeService,
              private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.updateTabSelection(this.DEFAULT_OPTION);
    this.retrieveCurriculum();

    this.optionChangeSubscription = this._notificationService.triggerCVOptionChange.subscribe((option) => {
      this.updateTabSelection(option);
      this.updateSwiperSelection(option);
    });

    this.resizeChangeSubscription = this._resizeService.resizeChange
      .subscribe((data: boolean) => this.isMediumUpView = data);

    this.modalOpenedSubscription = this._notificationService.modalOpened.subscribe((type) => {
      this.updateModalOpenedState(type);
      this.updateModalOpened(type);
    });
  }

  ngOnDestroy(): void {
    this.optionChangeSubscription.unsubscribe();
    this.curriculumLoadedSubscription.unsubscribe();
    this.resizeChangeSubscription.unsubscribe();
    this.modalOpenedSubscription.unsubscribe();
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

  /**
   * Update modal opened state
   * @param type
   */
  private updateModalOpenedState(type: number): void {
    this._appState.set(STATE_KEYS[STATE_KEYS.MODAL_TYPE_OPENED], type);
  }

  /**
   * Update the modal opened to render the container animations
   * @param type
   */
  private updateModalOpened(type: number): void {
    this.typeModalOpened = type
  }

  /**
   * Retrieve the curriculum based on the observable
   */
  private retrieveCurriculum(): void {
    if (this._curriculumService.curriculum) {
      this.curriculum = this._curriculumService.curriculum
    } else {
      this.curriculumLoadedSubscription = this._curriculumService.updateCurriculumJSON()
        .subscribe(() => this.curriculum = this._curriculumService.curriculum);
    }
  }

}
