import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { CurriculumService } from '../../../../../services/curriculum.service';

import { Employ } from '../../../../../models/Curriculum/Employ/Employ';
import { Project } from '../../../../../models/Curriculum/Project/Project';


@Component({
  selector: 'project-dialog',
  styleUrls: ['./project-dialog.scss'],
  templateUrl: './project-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectDialog implements OnInit {
  private project: Project;
  private employ: Employ;

  constructor(private _curriculumService: CurriculumService) {
  }

  ngOnInit(): void {
    this.employ = this._curriculumService.getEmployerFromProject(this.project.id);
  }

}
