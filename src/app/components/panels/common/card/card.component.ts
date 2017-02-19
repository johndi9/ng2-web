import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnInit } from '@angular/core';
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

export class Card implements AfterViewInit, OnInit {
  @Input() element: Project | Employ;
  @Input() isTabSelected: boolean;
  @Input() animationInMs: number;
  @Input() animationDelay: number;

  private isProject: boolean;

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

  ngOnInit(): void {
    this.isProject = this.element instanceof Project;
  }

  ngAfterViewInit(): void {
    this.isLoadingView = false;
  }

  private openModal(): void {
    let dialogBodyComponent;
    let dialogVariable: string;

    if (this.isProject) {
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
