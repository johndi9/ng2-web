import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Employ } from '../../../../../models/Curriculum/Employ/Employ';

import { animationSettings } from '../../../../../animations/animations';


@Component({
  selector: 'employ-wrapper',
  styleUrls: ['./employ-wrapper.scss'],
  templateUrl: './employ-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployWrapper {
  @Input() employs: Employ[];
  @Input() isTabSelected: boolean;
  @Input() isModalOpened: boolean;
  @Input() screenType: string;
  @Input() slideToLeft: boolean;

  private animationSettings = animationSettings;

  constructor() {
  }

}
