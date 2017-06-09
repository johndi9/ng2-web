import { Injectable, ViewContainerRef, Inject, ComponentRef } from '@angular/core';
import { ComponentType, MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';

import { InjectionService } from './injection.service';

import { Ng2Ripple } from '../components/panels/common/ng2-ripple/ng2-ripple.component';

import { Dialog } from '../models/Components/Dialog';

import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';


@Injectable()
export class DialogService {
  notifyDialogClosed: Observable<boolean>;
  private observer: Observer<boolean>;

  private doc: any;
  private rippleContainer: ComponentRef<any>;
  private storedDialogRef: MdDialogRef<any>;

  private readonly DEFAULT_CONFIG: MdDialogConfig = {
    disableClose: false,
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  private readonly RIPPLE_SPEED_DESKTOP: number = 0.5;
  private readonly RIPPLE_SPEED_DEVICE: number = 0.7;
  private readonly RIPPLE_SIZE_FACTOR: number = 1.3;
  /** Fade-in duration for the ripples. Can be modified with the speedFactor option. */
  private readonly RIPPLE_FADE_IN_DURATION = 450;
  /** Fade-out duration for the ripples in milliseconds. This can't be modified by the speedFactor. */
  private readonly RIPPLE_FADE_OUT_DURATION = 400;

  constructor(public mdDialog: MdDialog,
              @Inject(DOCUMENT) doc: any,
              private _injectionService: InjectionService) {
    // Get document
    this.doc = doc;

    // Share the observable to notify when the dialog will be closed
    this.notifyDialogClosed = new Observable(observer => this.observer = observer).share();
  }

  /**
   * Open a dialog and resolve an observable for the close event
   * @param dialog
   * @param config
   * @param containerElem
   * @return {Observable<boolean>}
   */
  public open<T>(dialog: Dialog, config: MdDialogConfig = this.DEFAULT_CONFIG, containerElem: ViewContainerRef, event: MouseEvent, isMediumUpView: boolean): void {
    if (containerElem) {
      config.viewContainerRef = containerElem;
    }

    let dialogRef: MdDialogRef<T>;

    this.triggerRipple(event, isMediumUpView).subscribe(() => {
      this.disableBodyScroll();
      dialogRef = this.mdDialog.open(dialog.bodyComponent as ComponentType<T>, config);
      dialog.dialogInstance.forEach((singleInstance, i) => dialogRef.componentInstance[singleInstance] = dialog.dialogInstanceValue[i]);

      this.rippleContainer.location.nativeElement.querySelector('.mat-ripple-element').style.transition = `transform ${this.RIPPLE_FADE_IN_DURATION}ms ease`;

      this.storedDialogRef = dialogRef;

      dialogRef.afterClosed().subscribe(() => {
        this.rippleContainer.location.nativeElement.querySelector('.mat-ripple-element').style.transform = 'scale(0)';
        // this.rippleContainer.location.nativeElement.querySelector('.mat-ripple-element').style.transition = `transform ${this.RIPPLE_FADE_OUT_DURATION}ms ease`;
        this.blockModalOpenAnimation(isMediumUpView, false).subscribe(() => {
          this.enableBodyScroll();
          this.closeRipple();
          dialogRef = null;
          this.observer.next(true);
        })
      });
    });
  }

  /**
   * Close dialog layer
   */
  public close(): void {
    this.mdDialog.closeAll();
  }

  /**
   * Block the modal until the ripple animation has finished
   * @param isMediumUpView
   * @param isOpening
   * @return {any}
   */
  private blockModalOpenAnimation(isMediumUpView: boolean, isOpening: boolean): Observable<boolean> {
    let duration = this.getSpeedDuration(isMediumUpView, isOpening) / 3;

    return Observable.of(true).delay(duration);
  }

  /**
   * Trigger ripple animation for dialog background
   * @param event
   * @param isMediumUpView
   */
  private triggerRipple(event: MouseEvent, isMediumUpView: boolean): Observable<boolean> {
    const radius: number = this.RIPPLE_SIZE_FACTOR *
      (event ? this.getMaximumSquareSide(event) : Math.max(window.innerWidth, window.innerHeight));
    const speedFactor: number = this.getSpeedFactor(isMediumUpView);

    if (!this.rippleContainer) {
      this.appendRipple();
    }

    if (event) {
      this.setInitialCoordinatesRipple(event);
    }

    // Trigger ripple
    (<Ng2Ripple>this.rippleContainer.instance).launch(event ? event.pageX : 0, event ? event.pageY : 0,
      { centered: !event, persistent: true, radius: radius, color: 'white', speedFactor: speedFactor });

    return this.blockModalOpenAnimation(isMediumUpView, true);
  }

  /**
   * Get the maximum axis side in order to create from there the ripple radius
   * @param event
   * @returns {number}
   */
  private getMaximumSquareSide(event: MouseEvent): number {
    const maxXAxis: number = Math.max(Math.abs(window.innerWidth - event.clientX), event.clientX);
    const maxYAxis: number = Math.max(Math.abs(window.innerHeight - event.clientY), event.clientY);

    return Math.max(maxXAxis, maxYAxis);
  }

  /**
   * Center the ripple element based on the event coordinates
   * @param event
   */
  private setInitialCoordinatesRipple(event: MouseEvent): void {
    this.rippleContainer.location.nativeElement.style.top = event.pageY + 'px';
    this.rippleContainer.location.nativeElement.style.left = event.pageX + 'px';
  }

  /**
   * Close ripple animation for dialog background
   */
  private closeRipple(): void {
    (<Ng2Ripple>this.rippleContainer.instance).fadeOutAll();
  }

  /**
   * Get speed factor for the ripple
   * @param isMediumUpView
   * @returns {number}
   */
  private getSpeedFactor(isMediumUpView: boolean): number {
    return isMediumUpView ? this.RIPPLE_SPEED_DESKTOP : this.RIPPLE_SPEED_DEVICE;
  }

  /**
   * Get speed duration for the ripple
   * @param isMediumUpView
   * @param isOpening
   * @returns {number}
   */
  private getSpeedDuration(isMediumUpView: boolean, isOpening: boolean): number {
    const speedFactor: number = this.getSpeedFactor(isMediumUpView);

    return (isOpening ? this.RIPPLE_FADE_IN_DURATION : this.RIPPLE_FADE_OUT_DURATION) * (1 / (speedFactor || 1));
  }

  /**
   * Enable the scroll outside the dialog
   */
  private enableBodyScroll(): void {
    this.doc.body.classList.remove('no-scroll');
  }

  /**
   * Disable the scroll outside the dialog
   */
  private disableBodyScroll(): void {
    if (!this.doc.body.classList.contains('no-scroll')) {
      this.doc.body.classList.add('no-scroll');
    }
  }

  private appendRipple(): void {
    let dialogWrapper = this.doc.querySelector('.cdk-overlay-container');

    if (!dialogWrapper) {
      const container = document.createElement('div');
      container.classList.add('cdk-overlay-container');
      this.doc.body.appendChild(container);

      dialogWrapper = container;
    }

    this.rippleContainer = this._injectionService.appendComponent(Ng2Ripple,
      { mdRippleUnbounded: true, mdRippleColor: 'white' }, dialogWrapper);
  }

}
