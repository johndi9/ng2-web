import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Employ } from '../../../../../models/Curriculum/Employ/Employ';
import { Project } from '../../../../../models/Curriculum/Project/Project';


@Component({
  selector: 'project-dialog',
  styleUrls: ['./project-dialog.scss'],
  templateUrl: './project-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectDialog {
  project: Project;
  employ: Employ;

  constructor() {
  }

}
