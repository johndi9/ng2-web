import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Employ } from '../../../../../models/Curriculum/Employ/Employ';


@Component({
  selector: 'employ-dialog',
  styleUrls: ['./employ-dialog.scss'],
  templateUrl: './employ-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployDialog {
  public employ: Employ;

  constructor() {
  }

}
