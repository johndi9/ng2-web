import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Project } from '../../../../../models/Curriculum/Project/Project';

import { animationSettings } from '../../../../../animations/animations';

import { SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper implements OnInit {
  @Input() projects: Project[];
  @Input() isTabSelected: boolean;
  @Input() isModalOpened: boolean;
  @Input() isMediumUpView: boolean;
  @Input() slideToLeft: boolean;

  private SCREEN_TYPES = SCREEN_TYPES;
  private animationSettings = animationSettings;
  private screenType;

  constructor() {
  }

  ngOnInit(): void {
    this.screenType = this.isMediumUpView ? SCREEN_TYPES.DESKTOP_OR_BIGGER : SCREEN_TYPES.TABLET_OR_LOWER;
  }
}
