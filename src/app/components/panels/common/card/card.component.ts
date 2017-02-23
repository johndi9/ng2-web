import { Component, ComponentRef, Input, ChangeDetectionStrategy, AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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

export class Card implements AfterViewInit, OnInit, OnChanges {
  @Input() element: ComponentRef<any>;
  @Input() isTabSelected: boolean = false;
  @Input() isModalOpened: boolean;
  @Input() animationInMs: number;
  @Input() animationDelay: number;

  private isProject: boolean;
  private isLoadingView: boolean = true;
  private today: Date = new Date();
  private ANIMATION_TYPES = ANIMATION_TYPES;
  private animationIn: string = <any>ANIMATION_TYPES.bounceInRight;
  private animationOut: string =<any>ANIMATION_TYPES.hideElement;

  constructor(private _dialogService: DialogService,
              private _notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.isProject = this.element instanceof Project;
  }

  ngAfterViewInit(): void {
    this.isLoadingView = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateAnimation(changes);
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

  /**
   * Update the animation based on the input change
   * @param changes
   */
  private updateAnimation(changes: SimpleChanges): void {
    if (changes['isTabSelected'] && changes['isTabSelected'].previousValue !== changes['isTabSelected'].currentValue) {
      this.animationIn = <any>ANIMATION_TYPES.bounceInRight;
      this.animationOut = <any>ANIMATION_TYPES.hideElement;
      return;
    }
    if (changes['isModalOpened'] && changes['isModalOpened'].previousValue !== changes['isModalOpened'].currentValue) {
      this.animationIn = <any>ANIMATION_TYPES.bounceInDown;
      this.animationOut = <any>ANIMATION_TYPES.bounceOutDown;
    }
  }
}
