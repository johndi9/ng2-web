import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { EmployDialog } from '../../dialogs/employ-dialog/employ-dialog.component';

import { Dialog } from '../../../../../models/Components/Dialog';
import { Employ } from '../../../../../models/Curriculum/Employ/Employ';

import { CV_OPTION_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'employ-wrapper',
  styleUrls: ['./employ-wrapper.scss'],
  templateUrl: './employ-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployWrapper {
  @Input() employs: Employ[];
  @Input() isMediumUpView: boolean;

  private CV_OPTION_TYPES = CV_OPTION_TYPES;

  constructor() {
  }

  private getDialog(employ: Employ) {
    return new Dialog(EmployDialog, ['employ'], [employ]);
  }

}
