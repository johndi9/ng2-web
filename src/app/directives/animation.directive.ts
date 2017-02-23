import { Directive, Renderer, ElementRef, Input, AnimationPlayer, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { AnimationService } from '../services/animation.service';

import { ANIMATION_TYPES, animationSettings } from '../variables/variables';


@Directive({
  selector: '[animation]'
})
export class AnimationDirective implements OnChanges, OnDestroy {
  @Input('animation-duration') duration: number = animationSettings.duration;
  @Input('animation-delay') delay: number = 0;
  @Input('animation-easing') easing: string = 'ease';
  @Input('animation-in') animationIn: string = <any>ANIMATION_TYPES.bounceInRight;
  @Input('animation-out') animationOut: string = <any>ANIMATION_TYPES.hideElement;
  @Input('animation-play') animationPlay: boolean = false;

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
    let animationType = this.animationPlay ? this.animationIn : this.animationOut;

    this.animation = this.renderer.animate(
      this.element.nativeElement.firstElementChild || this.element.nativeElement,
      this._animService.getAnimation(animationType).startingStyles,
      this._animService.getAnimation(animationType).keyframes,
      this.duration,
      this.delay,
      this.easing
    );
  }
}
