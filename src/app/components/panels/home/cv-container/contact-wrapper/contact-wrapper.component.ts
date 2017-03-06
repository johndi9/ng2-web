import { Component, Input } from '@angular/core';

import { Contact } from '../../../../../models/Curriculum/Contact/Contact';
import { Location } from '../../../../../models/Curriculum/Location/Location';


@Component({
  selector: 'contact-wrapper',
  styleUrls: ['./contact-wrapper.scss'],
  templateUrl: './contact-wrapper.html'
})

export class ContactWrapper {
  @Input() contact: Contact;
  @Input() location: Location;
  
  constructor() {
  }
}
