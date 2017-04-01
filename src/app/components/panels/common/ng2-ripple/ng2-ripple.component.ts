import { Component, ViewChild } from '@angular/core';
import { MdRipple } from '@angular/material';


@Component({
  selector: 'ng2-ripple',
  styleUrls: ['./ng2-ripple.scss'],
  templateUrl: './ng2-ripple.html'
})

export class Ng2Ripple {
  @ViewChild(MdRipple) ripple: MdRipple;

  constructor() {
  }

  public launch(pageX: number, pageY: number, config?: any) {
    if (this.ripple) {
      return this.ripple.launch(pageX, pageY, config);
    }
  }

  public fadeOutAll(): void {
    if (this.ripple) {
      this.ripple.fadeOutAll();
    }
  }
}
