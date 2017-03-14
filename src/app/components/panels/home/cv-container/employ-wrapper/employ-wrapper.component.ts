import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Employ } from '../../../../../models/Curriculum/Employ/Employ';

import { animationSettings } from '../../../../../animations/animations';

import { SCREEN_TYPES } from '../../../../../variables/variables';


@Component({
  selector: 'employ-wrapper',
  styleUrls: ['./employ-wrapper.scss'],
  templateUrl: './employ-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmployWrapper implements OnInit{
  @Input() employs: Employ[];
  @Input() isTabSelected: boolean;
  @Input() isModalOpened: boolean;
  @Input() isMediumUpView: boolean;
  @Input() slideToLeft: boolean;

  private SCREEN_TYPES = SCREEN_TYPES;
  private animationSettings = animationSettings;
  private screenType;

  constructor() {
  }

  ngOnInit(): void {
    this.screenType = this.isMediumUpView ? SCREEN_TYPES.DESKTOP_OR_BIGGER : SCREEN_TYPES.TABLET_OR_LOWER;
  }

}
