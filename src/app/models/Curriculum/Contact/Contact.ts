import { JsonProperty } from '../../../utils/modelParser';

import { OtherContact } from './OtherContact/OtherContact';


export class Contact {
  website: string;
  phone: string;
  email: string;
  @JsonProperty({clazz: OtherContact})
  other: OtherContact[];

  constructor() {
    this.website = undefined;
    this.phone = undefined;
    this.email = undefined;
    this.other = undefined;
  }
}
