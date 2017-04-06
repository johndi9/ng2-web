import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CurriculumService } from '../../../../../services/curriculum.service';

import { CommonWrapper } from '../common-wrapper/common-wrapper.component';
import { ProjectDialog } from '../../dialogs/project-dialog/project-dialog.component';

import { Dialog } from '../../../../../models/Components/Dialog';
import { Employ } from '../../../../../models/Curriculum/Employ/Employ';
import { Project } from '../../../../../models/Curriculum/Project/Project';



@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper extends CommonWrapper {
  @Input() projects: Project[];

  constructor(private _curriculumService: CurriculumService) {
    super();
  }

  private getEmployerFromProject(projectId: number): Employ {
    return this._curriculumService.getEmployerFromProject(projectId);
  }

  private getDialog(project: Project) {
    return new Dialog(ProjectDialog, ['project'], [project]);
  }
}
