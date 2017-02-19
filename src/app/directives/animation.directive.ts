import { Directive, Renderer, ElementRef, Input, AnimationPlayer, AfterContentInit, OnDestroy } from '@angular/core';

import { AnimationService } from '../services/animation.service';


@Directive({
  selector: '[animation]'
})
export class AnimationDirective implements AfterContentInit, OnDestroy {
  @Input('animation-duration') duration: number = 300;
  @Input('animation-delay') delay: number = 0;
  @Input('animation-easing') easing: string = "ease";
  @Input('animation-animation') animationName: string = "fadeIn";
  @Input('animation-animation-leave') animationLeave: string = "fadeOut";

  private _play: boolean = true;
  get play(): boolean {
    return this._play;
  }

  @Input('animation-play')
  set play(value: boolean) {
    this._play = value;
    this.setAnimation(!this._play);
    this.animation.play();
    //The only way i found to fix last animation state
    this.animation.onDone(() => this.setAnimation(this._play));
  }

  private animation: AnimationPlayer;

  constructor(private renderer: Renderer, private element: ElementRef,
              private animService: AnimationService) {
  }

  //in case we don't use _play
  ngAfterContentInit() {
    this.setAnimation();
    if (this._play)
      this.animation.play();

  }

  ngOnDestroy() {
    this.setAnimation(true);
    this.animation.play();
    setTimeout(() => {
      return true
    }, this.duration + this.delay);
  }

  setAnimation(leaving: boolean = false) {
    let animationName = leaving ? this.animationLeave : this.animationName;
    this.animation = this.renderer.animate(
      this.element.nativeElement.firstElementChild || this.element.nativeElement,
      this.animService.getAnimation(animationName).startingStyles,
      this.animService.getAnimation(animationName).keyframes,
      this.duration,
      this.delay,
      this.easing
    );
    this.animation.pause();
  }
}
