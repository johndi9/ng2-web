import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Info } from '../../../../../models/Curriculum/Info/Info';
import { Interest } from '../../../../../models/Curriculum/Interest/Interest';
import { Skill } from '../../../../../models/Curriculum/Skill/Skill';


@Component({
  selector: 'personal-info-wrapper',
  styleUrls: ['./personal-info-wrapper.scss'],
  templateUrl: './personal-info-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonalInfoWrapper {
  @Input() info: Info;
  @Input() skillSets: Skill[];
  @Input() interests: Interest[];
  @Input() aboutMe: string[];

  constructor() {
  }
}
