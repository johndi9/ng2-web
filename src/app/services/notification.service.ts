import { Injectable, Output, EventEmitter } from '@angular/core';

import { EVENT_TYPES } from '../variables/variables';


@Injectable()
export class NotificationService {
  @Output() triggerCVOptionChange = new EventEmitter();

  constructor() {
  }

  public notifyListener(option, value?) {
    switch (option) {
      case EVENT_TYPES.CV_OPTION_CHANGED:
        this.triggerCVOptionChange.emit(value);
        break;
      default:
        break;
    }
  }
}
