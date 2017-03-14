import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Speaking } from '../../../../../models/Curriculum/Speaking/Speaking';
import { Writing } from '../../../../../models/Curriculum/Writing/Writing';


@Component({
  selector: 'other-info-wrapper',
  styleUrls: ['./other-info-wrapper.scss'],
  templateUrl: './other-info-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OtherInfoWrapper {
  @Input() writing: Writing[];
  @Input() speaking: Speaking[];

  constructor() {
  }
}
