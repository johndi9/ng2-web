import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { Speaking } from '../../../../../models/Curriculum/Speaking/Speaking';
import { Writing } from '../../../../../models/Curriculum/Writing/Writing';


@Component({
  selector: 'other-info-wrapper',
  styleUrls: ['./other-info-wrapper.scss'],
  templateUrl: './other-info-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OtherInfoWrapper implements OnChanges {
  @Input() typeScreen: number;
  @Input() writings: Writing[];
  @Input() speakings: Speaking[];

  private numberOfColumns: number;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.numberOfColumns = this.typeScreen + 1;
  }

  private getColumnsNumber(): Array<number> {
    return Array(this.numberOfColumns).fill(0).map((x, i) => i + 1);
  }
}
