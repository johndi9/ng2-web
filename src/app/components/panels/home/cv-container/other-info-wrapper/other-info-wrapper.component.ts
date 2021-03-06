import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CommonWrapper } from '../common-wrapper/common-wrapper.component';

import { Speaking } from '../../../../../models/Curriculum/Speaking/Speaking';
import { Writing } from '../../../../../models/Curriculum/Writing/Writing';


@Component({
  selector: 'other-info-wrapper',
  styleUrls: ['./other-info-wrapper.scss'],
  templateUrl: './other-info-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class OtherInfoWrapper extends CommonWrapper {
  @Input() writings: Writing[];
  @Input() speakings: Speaking[];

}
