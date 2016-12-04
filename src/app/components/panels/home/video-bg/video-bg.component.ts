import { Component } from '@angular/core';


@Component({
  selector: 'video-bg',
  styleUrls: ['./video-bg.scss'],
  templateUrl: './video-bg.html'
})

export class VideoBg {
  private numVideos: number = 5;
  private videoPath: string = '/assets/video/bg_' + Math.floor(Math.random() * this.numVideos) + '.mov';

  constructor() {}


}
