import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { AppState } from '../../../../../services/app.service';
import { NotificationService } from '../../../../../services/notification.service';
import MapUtils from '../../../../../utils/modelParser';

import { STATE_KEYS, CV_OPTION_TYPES, EVENT_TYPES } from '../../../../../variables/variables';
import { Tab } from '../../../../../models/Components/Tab/Tab';


@Component({
  selector: 'cv-menu-wrapper',
  styleUrls: ['./cv-menu-wrapper.scss'],
  templateUrl: './cv-menu-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvMenuWrapper {
  public CV_OPTION_TYPES = CV_OPTION_TYPES;
  private tabs: Tab[];
  private readonly TAB_WIDTH: number = 160;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService) {
    this.initializeTabs();
  }

  public selectOption(option: CV_OPTION_TYPES): void {
    if (this._appState.get(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED]) !== option) {
      // Update central state
      this._appState.set(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED], option);
      // Notify listeners
      this._notificationService.notifyListener(EVENT_TYPES.CV_OPTION_CHANGED);
    }
  }

  private initializeTabs(): void {
    const tabJson = [
      {
        id: this.CV_OPTION_TYPES.PERSONAL_INFO,
        text: 'Personal Information',
        iconName: 'fingerprint',
        active: true
      },
      {
        id: this.CV_OPTION_TYPES.PROJECTS,
        text: 'Projects',
        iconName: 'important_devices',
      },
      {
        id: this.CV_OPTION_TYPES.EMPLOYERS,
        text: 'Employers',
        iconName: 'business_center',
      },
      {
        id: this.CV_OPTION_TYPES.EDUCATION,
        text: 'Education',
        iconName: 'school',
      },
      {
        id: this.CV_OPTION_TYPES.OTHER_INFO,
        text: 'Other information',
        iconName: 'description',
      }];

    this.tabs = tabJson.map((tab) => MapUtils.deserialize(Tab, tab));
  }
}
