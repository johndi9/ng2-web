import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { CurriculumService } from '../../../../../services/curriculum.service';

import { ProjectDialog } from '../../dialogs/project-dialog/project-dialog.component';

import { Dialog } from '../../../../../models/Components/Dialog';
import { Employ } from '../../../../../models/Curriculum/Employ/Employ';
import { Project } from '../../../../../models/Curriculum/Project/Project';

import { CV_OPTION_TYPES, SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'project-wrapper',
  styleUrls: ['./project-wrapper.scss'],
  templateUrl: './project-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProjectWrapper implements OnChanges{
  @Input() projects: Project[];
  @Input() typeScreen: number;

  private numberOfColumns: number;

  private CV_OPTION_TYPES = CV_OPTION_TYPES;
  private SCREEN_TYPES: SCREEN_TYPES;

  constructor(private _curriculumService: CurriculumService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.numberOfColumns = this.typeScreen + 1;
  }

  private getEmployerFromProject(projectId: number): Employ {
    return this._curriculumService.getEmployerFromProject(projectId);
  }

  private getDialog(project: Project) {
    return new Dialog(ProjectDialog, ['project'], [project]);
  }

  private getColumnsNumber(): Array<number> {
    return Array(this.numberOfColumns).fill(0).map((x, i) => i + 1);
  }
}
