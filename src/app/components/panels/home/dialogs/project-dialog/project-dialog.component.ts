import { Component } from '@angular/core';

import { Project } from '../../../../../models/Curriculum/Project/Project';


@Component({
  selector: 'project-dialog',
  styleUrls: ['./project-dialog.scss'],
  templateUrl: './project-dialog.html'
})

export class ProjectDialog {
  public project: Project;

  constructor() {
  }

}
