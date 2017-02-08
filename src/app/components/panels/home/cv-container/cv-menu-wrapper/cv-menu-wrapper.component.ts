import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

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

export class CvMenuWrapper {
  @Input() tabSelected: number;

  private tabs: Tab[];

  public CV_OPTION_TYPES = CV_OPTION_TYPES;
  private readonly TAB_WIDTH: number = 160;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService) {
    this.tabs = data.tabs.map((tab) => MapUtils.deserialize(Tab, tab));
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
}
