import { Injectable } from '@angular/core';
import { AnimationStyles } from "@angular/core/src/animation/animation_styles";
import { AnimationKeyframe } from "@angular/core/src/animation/animation_keyframe";

import * as animations from '../animations/animations';


export class AnimationStructure {
  startingStyles: AnimationStyles;
  keyframes: AnimationKeyframe[];
}

@Injectable()
export class AnimationService {
  private animations: (screenType: string) => {};

  constructor() {
    this.animations = animations.animationArray;
  }

  getAnimation(screenType: string, name: string): AnimationStructure {
    return this.animations(screenType)[name];
  }
}