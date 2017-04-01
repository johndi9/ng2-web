import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { EmployDialog } from '../../dialogs/employ-dialog/employ-dialog.component';

import { Dialog } from '../../../../../models/Components/Dialog';
import { Employ } from '../../../../../models/Curriculum/Employ/Employ';

import { CV_OPTION_TYPES, SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'employ-wrapper',
  styleUrls: ['./employ-wrapper.scss'],
  templateUrl: './employ-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployWrapper implements OnChanges {
  @Input() employs: Employ[];
  @Input() typeScreen: number;

  private numberOfColumns: number;

  private CV_OPTION_TYPES = CV_OPTION_TYPES;
  private SCREEN_TYPES: SCREEN_TYPES;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.numberOfColumns = this.typeScreen + 1;
  }

  private getDialog(employ: Employ) {
    return new Dialog(EmployDialog, ['employ'], [employ]);
  }

  private getColumnsNumber(): Array<number> {
    return Array(this.numberOfColumns).fill(0).map((x, i) => i + 1);
  }

}
