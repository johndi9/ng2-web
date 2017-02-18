import { Component, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { Employ } from '../../../../models/Curriculum/Employ/Employ';
import { EmployDialog } from '../../home/dialogs/employ-dialog/employ-dialog.component';
import { Project } from '../../../../models/Curriculum/Project/Project';
import { ProjectDialog } from '../../home/dialogs/project-dialog/project-dialog.component';


@Component({
  selector: 'card',
  styleUrls: ['./card.scss'],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Card implements AfterViewInit {
  @Input() element: Project | Employ;
  @Input() isTabSelected: boolean;
  @Input() animationInMs: number;

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

  private openModal(): void {
    let dialogBodyComponent;
    let dialogVariable: string;

    if (this.element instanceof Project) {
      dialogBodyComponent = ProjectDialog;
      dialogVariable = 'project';
    } else {
      dialogBodyComponent = EmployDialog;
      dialogVariable = 'employ';
    }
    
    let dialogRef = this.dialog.open(dialogBodyComponent, this.config);
    dialogRef.componentInstance[dialogVariable] = this.element;
  }
}
