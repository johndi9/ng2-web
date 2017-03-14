import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Contact } from '../../../../../models/Curriculum/Contact/Contact';
import { Location } from '../../../../../models/Curriculum/Location/Location';
import { Social } from '../../../../../models/Curriculum/Social/Social';


@Component({
  selector: 'contact-wrapper',
  styleUrls: ['./contact-wrapper.scss'],
  templateUrl: './contact-wrapper.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactWrapper {
  @Input() contact: Contact;
  @Input() location: Location;
  @Input() social: Social;
  
  constructor() {
  }
}
