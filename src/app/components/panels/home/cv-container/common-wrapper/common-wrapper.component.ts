import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { ProjectDialog } from '../../dialogs/common-dialog/common-dialog.component';

import { CV_OPTION_TYPES, SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'common-wrapper',
  styleUrls: ['./common-wrapper.scss'],
  templateUrl: './common-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommonWrapper implements OnChanges {
  @Input() typeScreen: number;

  private numberOfColumns: number;

  private CV_OPTION_TYPES = CV_OPTION_TYPES;
  private SCREEN_TYPES: SCREEN_TYPES;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.numberOfColumns = this.typeScreen + 1;
  }

  getColumnsNumber(): Array<number> {
    return Array(this.numberOfColumns).fill(0).map((x, i) => i + 1);
  }
}
