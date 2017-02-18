import { Component, Input, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { Employ } from '../../../../../models/Curriculum/Employ/Employ';
import { EmployDialog } from '../../dialogs/employ-dialog/employ-dialog.component';


@Component({
  selector: 'employ-wrapper',
  styleUrls: ['./employ-wrapper.scss'],
  templateUrl: './employ-wrapper.html'
})

export class EmployWrapper implements AfterViewInit {
  @Input() employs: Employ[];
  @Input() isTabSelected: boolean;

  config: MdDialogConfig = {
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
  private isLoadingView: boolean = true;
  private today = new Date();

  constructor(public dialog: MdDialog) {
  }

  ngAfterViewInit(): void {
    this.isLoadingView = false;
  }

  private openModal(employ: Employ): void {
    let dialogRef = this.dialog.open(EmployDialog, this.config);
    dialogRef.componentInstance.employ = employ;
  }
}
