import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'video-bg',
  styleUrls: ['./video-bg.scss'],
  templateUrl: './video-bg.html'
})

export class VideoBg implements OnInit {
  public videoLoaded: boolean;
  private videoPath: string = '/assets/video/bg.mp4';
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {
    this.subscription = this.loadVideo().subscribe(() => this.videoLoaded = true);
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
