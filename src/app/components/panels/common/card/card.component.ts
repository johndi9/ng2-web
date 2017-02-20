import { Component, Input, ChangeDetectionStrategy, AfterViewInit, OnInit } from '@angular/core';

import { DialogService } from '../../../../services/dialog.service';

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
  private isModalOpened: boolean = false;

  private isLoadingView: boolean = true;
  private today = new Date();

  constructor(private _dialogService: DialogService) {
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

    this._dialogService.open(dialogBodyComponent, null, null, [dialogVariable], [this.element]).subscribe(() => {
      this.isModalOpened = false;
    });

    this.isModalOpened = true;
  }
}
