import { Component } from '@angular/core';
import { Platform } from '@angular/material';

import { SOCIAL_SHARE } from '../../../../variables/social-share';


@Component({
  selector: 'share-button',
  styleUrls: ['./share-button.scss'],
  templateUrl: './share-button.html'
})

export class ShareButton {
  socialShare = SOCIAL_SHARE;
  platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  openSocialModal(href: string) {
    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    return false;
  }
}
