import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { AppState } from '../../../../services/app.service';
import { NotificationService } from '../../../../services/notification.service';

import { Observable, Subscription } from 'rxjs/Rx';

import { STATE_KEYS, CV_OPTION_TYPES } from '../../../../variables/variables';


@Component({
  selector: 'cv-container',
  styleUrls: ['./cv-container.scss'],
  templateUrl: './cv-container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvContainer implements OnInit, OnDestroy {
  public optionSelected: number;
  public cvTabSelected = CV_OPTION_TYPES;
  private optionChangeSubscription: Subscription;

  private readonly DEFAULT_OPTION: number = 0;

  constructor(private _appState: AppState,
              private _notificationService: NotificationService) {
    this.getNewOptionState();
  }

  ngOnInit(): void {
    this.optionChangeSubscription = this._notificationService.triggerCVOptionChange
      .subscribe(() => this.getNewOptionState());
  }

  ngOnDestroy(): void {
    this.optionChangeSubscription.unsubscribe();
  }

  private getNewOptionState(): void {
    const newState = this._appState.get(STATE_KEYS[STATE_KEYS.CV_OPTION_SELECTED]);

    this.optionSelected = newState !== undefined ? newState : this.DEFAULT_OPTION;
  }

  public isOptionSelected(option: CV_OPTION_TYPES): boolean {
    return this.optionSelected === option;
  }
}
