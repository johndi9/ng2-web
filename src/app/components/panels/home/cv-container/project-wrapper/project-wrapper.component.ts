import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Project } from '../../../../../models/Curriculum/Project/Project';

import { animationSettings } from '../../../../../animations/animations';


@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper {
  @Input() projects: Project[];
  @Input() isTabSelected: boolean;

  private animationSettings = animationSettings;

  constructor() {
  }
}
