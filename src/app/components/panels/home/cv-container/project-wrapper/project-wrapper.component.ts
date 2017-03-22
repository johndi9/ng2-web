import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CurriculumService } from '../../../../../services/curriculum.service';

import { ProjectDialog } from '../../dialogs/project-dialog/project-dialog.component';

import { Dialog } from '../../../../../models/Components/Dialog';
import { Employ } from '../../../../../models/Curriculum/Employ/Employ';
import { Project } from '../../../../../models/Curriculum/Project/Project';

import { CV_OPTION_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper {
  @Input() projects: Project[];
  @Input() isMediumUpView: boolean;

  private CV_OPTION_TYPES = CV_OPTION_TYPES;

  constructor(private _curriculumService: CurriculumService) {
  }

  private getEmployerFromProject(projectId: number): Employ {
    return this._curriculumService.getEmployerFromProject(projectId);
  }

  private getDialog(project: Project) {
    return new Dialog(ProjectDialog, ['project'], [project]);
  }
}
