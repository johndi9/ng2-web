import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CommonWrapper } from '../common-wrapper/common-wrapper.component';
import { EmployDialog } from '../../dialogs/employ-dialog/employ-dialog.component';

import { Dialog } from '../../../../../models/Components/Dialog';
import { Employ } from '../../../../../models/Curriculum/Employ/Employ';


@Component({
  selector: 'employ-wrapper',
  styleUrls: ['./employ-wrapper.scss'],
  templateUrl: './employ-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployWrapper extends CommonWrapper {
  @Input() employs: Employ[];

  private getDialog(employ: Employ) {
    return new Dialog(EmployDialog, ['employ'], [employ]);
  }

}
