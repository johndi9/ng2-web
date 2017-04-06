import { JsonProperty } from '../../../utils/modelParser';

import { Publisher } from './Publisher/Publisher';


export class Writing {
  title: string;
  flavor: string;
  date: Date;
  @JsonProperty({clazz: Publisher})
  publisher: Publisher;
  url: string;
  logo: string;
  author: string[];
  summary: string;

  constructor() {
    this.title = undefined;
    this.flavor = undefined;
    this.date = undefined;
    this.publisher = undefined;
    this.url = undefined;
    this.logo = undefined;
    this.author = undefined;
    this.summary = undefined;
  }
}
