import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'video-bg',
  styleUrls: ['./video-bg.scss'],
  templateUrl: './video-bg.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VideoBg implements OnInit {
  private videoPath: string;
  private subscription: Subscription;

  cover: string;

  constructor(private _elementRef: ElementRef,
              private platform: Platform) {
    this.videoPath = '/assets/video/' + (platform.ANDROID || platform.IOS ? 'bg-min.mp4' : 'bg.mp4')
    this.cover = platform.ANDROID || platform.IOS ? '/assets/images/normal/cover/cover.png' : '';
  }

  ngOnInit(): void {
    this.subscription = this.loadVideo().subscribe(() => {
      const video: HTMLVideoElement = this._elementRef.nativeElement.querySelector('video');

      video.src = this.videoPath;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadVideo(): Observable<HTMLVideoElement> {
    return Observable.create(observer => {
      const video: HTMLVideoElement = document.createElement('video');

      video.src = this.videoPath;
      video.load();
      video.addEventListener('loadeddata', () => {
        observer.next();
        observer.complete();
      });
      video.onerror = err => observer.error(err);
    });
  }

}
