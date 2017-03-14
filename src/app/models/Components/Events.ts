import { CV_OPTION_TYPES } from '../../variables/variables';

export class ModalOpened {
  event: MouseEvent;
  type: CV_OPTION_TYPES;

  constructor() {
    this.event = undefined;
    this.type = undefined;
  }
}
