import {
  Component, ComponentRef, Input, ChangeDetectionStrategy, AfterViewInit, OnInit, ElementRef
} from '@angular/core';

import { DialogService } from '../../../../services/dialog.service';
import { NotificationService } from '../../../../services/notification.service';

import { EmployDialog } from '../../home/dialogs/employ-dialog/employ-dialog.component';
import { Project } from '../../../../models/Curriculum/Project/Project';
import { ProjectDialog } from '../../home/dialogs/project-dialog/project-dialog.component';

import { EVENT_TYPES, CV_OPTION_TYPES, ANIMATION_TYPES } from '../../../../variables/variables';


@Component({
  selector: 'card',
  styleUrls: ['./card.scss'],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Card implements AfterViewInit, OnInit {
  @Input() element: ComponentRef<any>;
  @Input() isTabSelected: boolean = false;
  @Input() isModalOpened: boolean;
  @Input() animationInMs: number;
  @Input() animationDelay: number;
  @Input() screenType: string;
  @Input() slideToLeft: boolean;

  private isProject: boolean;
  private isLoadingView: boolean = true;
  private today: Date = new Date();
  private ANIMATION_TYPES = ANIMATION_TYPES;

  constructor(private _dialogService: DialogService,
              private _notificationService: NotificationService,
              private _elementRef: ElementRef) {
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

    this.notifyDialogChange(this.isProject ? CV_OPTION_TYPES.PROJECTS : CV_OPTION_TYPES.EMPLOYS);

    this._dialogService.open(dialogBodyComponent, null, null, [dialogVariable], [this.element]).subscribe(() => {
      this.notifyDialogChange();
    });
  }

  /**
   * Update the central state with the new modal status
   * @param typeModalOpened
   */
  private notifyDialogChange(typeModalOpened?: CV_OPTION_TYPES) {
    this._notificationService.notifyListener(EVENT_TYPES.MODAL_OPENED, typeModalOpened);
  }
}
