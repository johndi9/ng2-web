import { Component, OnInit, ElementRef, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Curriculum } from '../../../../models/Curriculum/Curriculum';

import { TAB_OPTIONS, TAB_URL_PATHS } from '../../../../variables/variables';


@Component({
  selector: 'cv-container',
  styleUrls: ['./cv-container.scss'],
  templateUrl: './cv-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvContainer implements OnInit, OnChanges {
  @Input() curriculum: Curriculum;
  @Input() tabSelected: number;
  @Input() modalOpened: { index: number, type: number };
  @Input() typeScreen: number;

  bgClass: string;

  readonly SIDEBAR_MAX_WIDTH: string = '320px';

  constructor(private _elementRef: ElementRef,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.updateTabSelection(this.tabSelected);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabSelected'] && changes['tabSelected'].currentValue !== changes['tabSelected'].previousValue) {
      setTimeout(() => {
        this.updateTabSelection(this.tabSelected);
        this.updateSwiperSelection(this.tabSelected);
      }, 0);
    }
  }

  /**
   * Index change based on a swiper action (mouse/finger swipe)
   * @param index
   */
  onIndexSwiperChange(option: TAB_OPTIONS) {
    if (this.tabSelected !== option) {
      this._router.navigate(['/' + TAB_URL_PATHS[option]]);
    }
  }

  /**
   * Update the Swiper selection.
   * This is a hack since input events are still not handled by the ng2-swiper API
   * @param option
   */
  private updateSwiperSelection(option: number): void {
    const swiperSelection = this.getSwiperOption(option);
    if (swiperSelection) {
      swiperSelection.click();
    } else {
      // TODO: remove this case when NgxSwiper supports init Output
      var checkExist = setInterval(() => {
        const swiperSelection = this.getSwiperOption(option);
        if (swiperSelection) {
          swiperSelection.click();
          clearInterval(checkExist);
        }
      }, 100);
    }
  }

  private getSwiperOption(option: number) {
    const swiperOption = this._elementRef.nativeElement.getElementsByClassName('swiper-pagination-handle');
    return swiperOption && swiperOption[option];
  }

  /**
   * Update the state/model of the tabs
   * @param option
   */
  private updateTabSelection(option: number): void {
    this.updateTabSelected(option);
    this.updateBgColor(option);
    this.resetScroll();
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
      case TAB_OPTIONS.PROJECTS:
      case TAB_OPTIONS.EMPLOYS:
      case TAB_OPTIONS.EDUCATION:
      case TAB_OPTIONS.OTHER_INFO:
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
