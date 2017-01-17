import { Publisher } from './Publisher/Publisher';

export class Writing {
  title: string;
  flavor: string;
  date: Date;
  publisher: Publisher;
  url: string;
  author: Array<string>;
  summary: string;
}