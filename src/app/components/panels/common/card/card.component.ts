import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { DialogService } from '../../../../services/dialog.service';
import { NotificationService } from '../../../../services/notification.service';

import { Dialog } from '../../../../models/Components/Dialog';

import { EVENT_TYPES, CV_OPTION_TYPES, SCREEN_TYPES } from '../../../../variables/variables';


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
  @Input() event: string;
  @Input() author: string;
  @Input() dialog: Dialog;
  @Input() type: CV_OPTION_TYPES;
  @Input() logo: string;
  @Input() typeScreen: number;
  @Input() hideCardActions: boolean;
  @Input() willTriggerModal: boolean;

  logoWidth: string;
  logoHeight: string;

  private LOGO_SIZE: string = '50px';

  constructor(private _dialogService: DialogService,
              private _notificationService: NotificationService) {
    this.logoWidth = this.LOGO_SIZE;
    this.logoHeight = this.LOGO_SIZE;
  }

  ngOnInit(): void {
  }

  openModal(event: MouseEvent): void {
    this.notifyDialogChange(event, this.type);

    this._dialogService.open(this.dialog, null, null, event, this.typeScreen !== SCREEN_TYPES.MOBILE);

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
