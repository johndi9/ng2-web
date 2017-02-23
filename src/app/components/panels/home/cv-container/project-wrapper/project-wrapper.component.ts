import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Project } from '../../../../../models/Curriculum/Project/Project';

import { animationSettings } from '../../../../../variables/variables';


@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper {
  @Input() projects: Project[];
  @Input() isTabSelected: boolean;
  @Input() isModalOpened: boolean;

  private animationSettings = animationSettings;

  constructor() {
  }
}
