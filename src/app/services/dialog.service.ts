import { Injectable, ViewContainerRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ComponentType, MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class DialogService {

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

  constructor(public dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    dialog.afterOpen.subscribe((ref: MdDialogRef<any>) => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });
    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('no-scroll');
    });
  }

  /**
   * Open a dialog and return an observable for the close event
   * @param dialogComp
   * @param config
   * @param containerElem
   * @param compInstance
   * @param compObj
   * @return {Observable<any>}
   */
  public open<T>(dialogComp: ComponentType<T>, config: MdDialogConfig = this.DEFAULT_CONFIG, containerElem: ViewContainerRef, compInstance: string[], compObj: any[]): Observable<boolean> {
    if (containerElem) {
      config.viewContainerRef = containerElem;
    }

    let dialogRef: MdDialogRef<T>;

    dialogRef = this.dialog.open(dialogComp, config);
    compInstance.forEach((singleInstance, i) => dialogRef.componentInstance[singleInstance] = compObj[i]);

    return dialogRef.afterClosed();
  }
}