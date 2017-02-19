import {
  Component, ChangeDetectionStrategy, Input, ElementRef, OnChanges, SimpleChanges, AfterViewInit
} from '@angular/core';

import { AppState } from '../../../../../services/app.service';
import { NotificationService } from '../../../../../services/notification.service';

import { STATE_KEYS, CV_OPTION_TYPES, EVENT_TYPES } from '../../../../../variables/variables';
import { Tab } from '../../../../../models/Components/Tab/Tab';
import MapUtils from '../../../../../utils/modelParser';

import { data } from '../../../../../data/data';


@Component({
  selector: 'cv-menu-wrapper',
  styleUrls: ['./cv-menu-wrapper.scss'],
  templateUrl: './cv-menu-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvMenuWrapper implements AfterViewInit, OnChanges {
  @Input() tabSelected: number;
  @Input() isMediumUpView: boolean;

  private tabs: Tab[];
  private scrollableContainer: HTMLElement;

  public CV_OPTION_TYPES = CV_OPTION_TYPES;
  private readonly TAB_WIDTH: number = 160;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService,
              private _elementRef: ElementRef) {
    this.tabs = data.tabs.map((tab) => MapUtils.deserialize(Tab, tab));
  }

  ngAfterViewInit(): void {
    this.scrollableContainer = this._elementRef.nativeElement.querySelector('.tabs-container');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCentralTabPosition();
  }

  /**
   * Notify the central CVContainer as soon as the user selects some tab here
   * @param option
   */
  private selectOption(option: CV_OPTION_TYPES): void {
    if (this._appState.get(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED]) !== option) {
      this._notificationService.notifyListener(EVENT_TYPES.CV_OPTION_CHANGED, option);
    }
  }

  /**
   * For every input update, the central tab position gets updated
   */
  private updateCentralTabPosition(): void {
    if (!this.isMediumUpView) {
      const totalVisibleWidth: number = window.innerWidth || document.documentElement.clientWidth;

      // Reload the element if scrollLeft is not writable anymore
      if (!this.scrollableContainer || !this.scrollableContainer.scrollLeft) {
        this.scrollableContainer = this._elementRef.nativeElement.querySelector('.tabs-container');
      }
      if (this.scrollableContainer) {
        this.scrollableContainer.scrollLeft = this.tabSelected * this.TAB_WIDTH - (totalVisibleWidth - this.TAB_WIDTH) / 2;
      }
    }
  }
}
