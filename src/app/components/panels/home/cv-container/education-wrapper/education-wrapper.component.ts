import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CommonWrapper } from '../common-wrapper/common-wrapper.component';

import { Certificate } from '../../../../../models/Curriculum/Certificate/Certificate';
import { Education } from '../../../../../models/Curriculum/Education/Education';
import { Language } from '../../../../../models/Curriculum/Language/Language';
import { Seminar } from '../../../../../models/Curriculum/Seminar/Seminar';



@Component({
  selector: 'education-wrapper',
  styleUrls: ['./education-wrapper.scss'],
  templateUrl: './education-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EducationWrapper extends CommonWrapper {
  @Input() educations: Education[];
  @Input() certificates: Certificate[];
  @Input() seminars: Seminar[];
  @Input() languages: Language[];
}
