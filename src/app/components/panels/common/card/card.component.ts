import { Component, Input, ChangeDetectionStrategy, OnInit, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { DialogService } from '../../../../services/dialog.service';

import { Dialog } from '../../../../models/Components/Dialog';

import { TAB_OPTIONS, SCREEN_TYPES, TAB_URL_PATHS } from '../../../../variables/variables';


@Component({
  selector: 'card',
  styleUrls: ['./card.scss'],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Card implements OnInit, OnChanges, OnDestroy {
  @Input() id: number;
  @Input() location: string;
  @Input() employer: string;
  @Input() institution: string;
  @Input() event: string;
  @Input() author: string;
  @Input() dialog: Dialog;
  @Input() type: TAB_OPTIONS;
  @Input() logo: string;
  @Input() typeScreen: number;
  @Input() hideCardActions: boolean;
  @Input() willTriggerModal: boolean;
  @Input() modalOpened: { index: number, type: number };

  private dialogSubscription: Subscription;
  private storedEvent: MouseEvent;

  logoWidth: string;
  logoHeight: string;

  private LOGO_SIZE: string = '50px';

  constructor(private _dialogService: DialogService,
              private _router: Router) {
    this.logoWidth = this.LOGO_SIZE;
    this.logoHeight = this.LOGO_SIZE;
  }

  ngOnInit(): void {
    if (this.modalOpened && this.id === this.modalOpened.index && this.type === this.modalOpened.type) {
      setTimeout(() => {
        this._dialogService.open(this.dialog, null, null, null, this.typeScreen !== SCREEN_TYPES.MOBILE);
      }, 0);
    }
    this.dialogSubscription = this._dialogService.notifyDialogClosed.subscribe(() => this.closeModal());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modalOpened'] && changes['modalOpened'].currentValue && changes['modalOpened'].previousValue) {
      setTimeout(() => {
        if (changes['modalOpened'].currentValue.index === this.id && changes['modalOpened'].currentValue.type === this.type &&
          changes['modalOpened'].previousValue.index === null) {
          this._dialogService.open(this.dialog, null, null, this.storedEvent, this.typeScreen !== SCREEN_TYPES.MOBILE);
        }
        if (changes['modalOpened'].currentValue.index === null && changes['modalOpened'].previousValue.index === this.id &&
          changes['modalOpened'].previousValue.type === this.type) {
          this._dialogService.close();
        }
        this.storedEvent = null;
      }, 0);
    }
  }

  openModal(event: MouseEvent): void {
    this.storedEvent = event;
    this._router.navigate(['/' + TAB_URL_PATHS[this.type] + '/' + this.id]);
  }

  closeModal(): void {
    if (this.modalOpened && this.id === this.modalOpened.index && this.type === this.modalOpened.type) {
      this._router.navigate(['/' + TAB_URL_PATHS[this.type]]);
    }
  }

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }
}
