export class Employ {
  employer: string;
  location: string;
  url: number;
  logo: string;
  position: number;
  summary: string;
  start: Date;
  end: Date;
  keywords: string[];
  highlights: string[];

  constructor() {
    this.employer = undefined;
    this.location = undefined;
    this.url = undefined;
    this.logo = undefined;
    this.position = undefined;
    this.summary = undefined;
    this.start = undefined;
    this.end = undefined;
    this.keywords = undefined;
    this.highlights = undefined;
  }
}
