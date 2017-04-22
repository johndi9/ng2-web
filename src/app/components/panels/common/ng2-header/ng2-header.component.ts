import { Component, EventEmitter, Output, trigger, state, transition, style, animate, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'ng2-header',
  styleUrls: ['./ng2-header.scss'],
  templateUrl: './ng2-header.html',
  animations: [
    trigger('isTopOfPage', [
      state('true', style({
        color: '#FFFFFF',
        transform: 'scale(1)'
      })),
      state('false', style({
        color: '#2b2b2b',
        transform: 'scale(1.1)'
      })),
      transition('0 => 1', animate('100ms ease-in')),
      transition('1 => 0', animate('100ms ease-out'))
    ])
  ]
})

export class Ng2Header implements OnInit {
  @Output() callback = new EventEmitter();

  public isTopOfPage: boolean = true;
  private didScroll: boolean = false;

  constructor() {
  }

  ngOnInit() {
    Observable.fromEvent(window, 'scroll').subscribe(() => {
      if (!this.didScroll) {
        this.didScroll = true;
        setTimeout(() => this.scrollPage(), 250);
      }
    });
  }

  /**
   * Method to handle click events
   */
  public openSidebar(): void {
    this.callback.emit();
  }

  /**
   * Modify the header state depending on the offset
   */
  private scrollPage(): void {
    this.isTopOfPage = this.scrollY() < window.innerHeight - 100;
    this.didScroll = false;
  }

  /**
   * Get Y axis offset
   * @returns {number}
   */
  private scrollY(): number {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
}
