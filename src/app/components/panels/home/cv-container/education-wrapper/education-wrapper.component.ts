import { Component, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';

import { Certificate } from '../../../../../models/Curriculum/Certificate/Certificate';
import { Education } from '../../../../../models/Curriculum/Education/Education';
import { Language } from '../../../../../models/Curriculum/Language/Language';
import { Seminar } from '../../../../../models/Curriculum/Seminar/Seminar';

import { SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'education-wrapper',
  styleUrls: ['./education-wrapper.scss'],
  templateUrl: './education-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EducationWrapper implements OnChanges {
  @Input() typeScreen: number;
  @Input() educations: Education[];
  @Input() certificates: Certificate[];
  @Input() seminars: Seminar[];
  @Input() languages: Language[];

  private numberOfColumns: number;

  private SCREEN_TYPES: SCREEN_TYPES;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.numberOfColumns = this.typeScreen + 1;
  }

  private getColumnsNumber(): Array<number> {
    return Array(this.numberOfColumns).fill(0).map((x, i) => i + 1);
  }
}
