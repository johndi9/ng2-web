import { Component } from '@angular/core';

import { SOCIAL_SHARE } from '../../../../variables/social-share';


@Component({
  selector: 'share-button',
  styleUrls: ['./share-button.scss'],
  templateUrl: './share-button.html'
})

export class ShareButton {
  private socialShare = SOCIAL_SHARE;

  constructor() {
  }

  private openSocialModal(href: string) {
    window.open(href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    return false;
  }
}
