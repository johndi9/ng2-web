import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { DialogService } from '../../../../services/dialog.service';
import { NotificationService } from '../../../../services/notification.service';

import { Dialog } from '../../../../models/Components/Dialog';

import { EVENT_TYPES, CV_OPTION_TYPES } from '../../../../variables/variables';


@Component({
  selector: 'card',
  styleUrls: ['./card.scss'],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Card implements OnInit {
  @Input() location: string;
  @Input() employer: string;
  @Input() institution: string;
  @Input() dialog: Dialog;
  @Input() type: CV_OPTION_TYPES;
  @Input() logo: string;
  @Input() isMediumUpView: boolean;
  @Input() willTriggerModal: boolean;

  constructor(private _dialogService: DialogService,
              private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  private openModal(event: MouseEvent): void {
    this.notifyDialogChange(event, this.type);

    this._dialogService.open(this.dialog, null, null, event, this.isMediumUpView);

    this._dialogService.notifyDialogClosed.subscribe(() => this.notifyDialogChange(event))
  }

  /**
   * Update the central state with the new modal status
   * @param typeModalOpened
   */
  private notifyDialogChange(event: Event, typeModalOpened?: CV_OPTION_TYPES) {
    this._notificationService.notifyListener(EVENT_TYPES.MODAL_OPENED,
      { 'event': event, 'type': typeModalOpened });
  }
}
