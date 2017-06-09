import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { ProjectDialog } from '../../dialogs/common-dialog/common-dialog.component';

import { SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'common-wrapper',
  styleUrls: ['./common-wrapper.scss'],
  templateUrl: './common-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommonWrapper implements OnChanges {
  @Input() typeScreen: number;
  @Input() modalOpened: { index: number, type: number };

  private numberOfColumns: number;

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
