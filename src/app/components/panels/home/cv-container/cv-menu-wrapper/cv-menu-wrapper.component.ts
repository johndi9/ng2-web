import {
  Component, ChangeDetectionStrategy, Input, ElementRef, OnChanges, SimpleChanges, AfterViewInit, HostListener
} from '@angular/core';

import { AppState } from '../../../../../services/app.service';
import { NotificationService } from '../../../../../services/notification.service';

import { Info } from '../../../../../models/Curriculum/Info/Info';
import { Tab } from '../../../../../models/Components/Tab';

import MapUtils from '../../../../../utils/modelParser';

import { STATE_KEYS, CV_OPTION_TYPES, EVENT_TYPES, TABS, SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'cv-menu-wrapper',
  styleUrls: ['./cv-menu-wrapper.scss'],
  templateUrl: './cv-menu-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvMenuWrapper implements AfterViewInit, OnChanges {
  @HostListener('window:scroll', ['$event'])
  triggerFixPosition(event) {
    const elementOffset: number = this.typeScreen === SCREEN_TYPES.MOBILE ? 75 : 140;
    this.hasFixPosition = window.pageYOffset + 63 > window.innerHeight - elementOffset;
  }

  @Input() name: string;
  @Input() info: Info;
  @Input() tabSelected: number;
  @Input() typeScreen: number;

  private tabs: Tab[];
  private tabKeys: string[] =
    ['personalInfoTitle', 'projectsTitle', 'employsTitle', 'educationTitle', 'otherInfoTitle', 'contactTitle'];
  private scrollableContainer: HTMLElement;

  SCREEN_TYPES = SCREEN_TYPES;
  hasFixPosition: boolean;
  private readonly TAB_WIDTH: number = 160;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService,
              private _elementRef: ElementRef) {
    this.tabs = TABS.map((tab) => MapUtils.deserialize(Tab, tab));
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
   * This is only managed for mobile view
   */
  private updateCentralTabPosition(): void {
    if (this.typeScreen === SCREEN_TYPES.MOBILE) {
      const totalVisibleWidth: number = window.innerWidth || document.documentElement.clientWidth;

      // Reload the element if scrollLeft is not writable anymore
      if (!this.scrollableContainer || !this.scrollableContainer.scrollLeft) {
        this.scrollableContainer = this._elementRef.nativeElement.querySelector('.tabs');
      }
      if (this.scrollableContainer) {
        this.scrollableContainer.scrollLeft = this.tabSelected * this.TAB_WIDTH - (totalVisibleWidth - this.TAB_WIDTH) / 2;
      }
    }
  }
}
