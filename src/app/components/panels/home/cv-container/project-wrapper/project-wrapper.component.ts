import { Component, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';

import { Project } from '../../../../../models/Curriculum/Project/Project';
import { ProjectDialog } from '../../dialogs/project-dialog/project-dialog.component';


@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper implements AfterViewInit{
  @Input() projects: Project[];

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

  private openModal(project: Project): void {
    let dialogRef = this.dialog.open(ProjectDialog, this.config);
    dialogRef.componentInstance.project = project;
  }
}
