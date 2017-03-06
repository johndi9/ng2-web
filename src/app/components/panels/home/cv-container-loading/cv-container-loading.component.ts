import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Speaking } from '../../../../../models/Curriculum/Speaking/Speaking';
import { Writing } from '../../../../../models/Curriculum/Writing/Writing';


@Component({
  selector: 'cv-container-loading',
  styleUrls: ['./cv-container-loading.scss'],
  templateUrl: './cv-container-loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CvContainerLoading {
  constructor() {
  }
}
