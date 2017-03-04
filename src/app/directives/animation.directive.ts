import { Directive, Renderer, ElementRef, Input, AnimationPlayer, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { AnimationService, AnimationStructure } from '../services/animation.service';

import { ANIMATION_TYPES } from '../variables/variables';
import { easeTypes } from '../animations/animations';


@Directive({
  selector: '[animation]'
})
export class AnimationDirective implements OnChanges, OnDestroy {
  @Input('animation-duration') duration: number;
  @Input('animation-delay') delay: number = 0;
  @Input('animation-easing') easing: string = easeTypes.bounceInRight;
  @Input('animation-in') animationIn: string = <any>ANIMATION_TYPES.bounceInRight;
  @Input('animation-out') animationOut: string = <any>ANIMATION_TYPES.hideElement;
  @Input('animation-play') animationPlay: boolean = false;
  @Input('screenType') screenType: string;

  private animation: AnimationPlayer;

  constructor(private renderer: Renderer,
              private element: ElementRef,
              private _animService: AnimationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.playAnimation();
  }

  ngOnDestroy() {
    this.playAnimation();
  }

  playAnimation() {
    this.setAnimation();
    this.animation.play();
  }

  setAnimation() {
    const animationType = this.animationPlay ? this.animationIn : this.animationOut;
    const animation: AnimationStructure = this._animService.getAnimation(this.screenType, animationType);

    if (animation) {
      this.animation = this.renderer.animate(
        this.element.nativeElement.firstElementChild || this.element.nativeElement,
        animation.startingStyles,
        animation.keyframes,
        this.duration,
        this.delay,
        this.easing
      );
    }
  }
}
