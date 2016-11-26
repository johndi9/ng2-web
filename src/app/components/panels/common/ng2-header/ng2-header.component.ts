import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'ng2-header',
  styleUrls: ['./ng2-header.scss'],
  templateUrl: './ng2-header.html'
})

export class Ng2Header {
  @Output() callback = new EventEmitter();

  constructor() {}

  /**
   * Method to handle click events
   * @param event
   */
  private openSidebar($event: Event): void {
    this.callback.emit($event);
  }
}
