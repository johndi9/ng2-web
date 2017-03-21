import {
  Component, ComponentRef, Input, ChangeDetectionStrategy, OnInit, ElementRef
} from '@angular/core';

import { CurriculumService } from '../../../../services/curriculum.service';
import { DialogService } from '../../../../services/dialog.service';
import { NotificationService } from '../../../../services/notification.service';

import { EmployDialog } from '../../home/dialogs/employ-dialog/employ-dialog.component';
import { Project } from '../../../../models/Curriculum/Project/Project';
import { ProjectDialog } from '../../home/dialogs/project-dialog/project-dialog.component';

import { Dialog } from '../../../../models/Components/Dialog';

import { EVENT_TYPES, CV_OPTION_TYPES, ANIMATION_TYPES, SCREEN_TYPES } from '../../../../variables/variables';
import { Employ } from '../../../../models/Curriculum/Employ/Employ';


@Component({
  selector: 'card',
  styleUrls: ['./card.scss'],
  templateUrl: './card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Card implements OnInit {
  @Input() element: Project | Employ;
  @Input() isTabSelected: boolean = false;
  @Input() isModalOpened: boolean;
  @Input() animationInMs: number;
  @Input() animationDelay: number;
  @Input() isMediumUpView: boolean;
  @Input() screenType;
  @Input() slideToLeft: boolean;

  private employFromProject: Employ;
  private isProject: boolean;
  private today: Date = new Date();
  private ANIMATION_TYPES = ANIMATION_TYPES;

  constructor(private _dialogService: DialogService,
              private _curriculumService: CurriculumService,
              private _notificationService: NotificationService,
              private _elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.isProject = this.element instanceof Project;
    this.employFromProject = this.isProject ? this._curriculumService.getEmployerFromProject(this.element.id) : null;
  }

  private openModal(event: MouseEvent): void {
    const dialog: Dialog = this.isProject ? new Dialog(ProjectDialog, ['project'], [this.element]) :
      new Dialog(EmployDialog, ['employ'], [this.element]);

    this.notifyDialogChange(event, this.isProject ? CV_OPTION_TYPES.PROJECTS : CV_OPTION_TYPES.EMPLOYS);

    this._dialogService.open(dialog, null, null, event, this.isMediumUpView);

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
