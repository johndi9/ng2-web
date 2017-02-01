import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { AppState } from '../../../../../services/app.service';
import { NotificationService } from '../../../../../services/notification.service';

import { STATE_KEYS, CV_OPTION_TYPES, EVENT_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'cv-menu-wrapper',
  styleUrls: ['./cv-menu-wrapper.scss'],
  templateUrl: './cv-menu-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvMenuWrapper {
  private cvTabSelected = CV_OPTION_TYPES;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService) {
  }

  private selectOption(option: CV_OPTION_TYPES): void {
    if (this._appState.get(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED]) !== option) {
      this._appState.set(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED], option);
      this._notificationService.notifyListener(EVENT_TYPES.CV_OPTION_CHANGED);
    }
  }
}
