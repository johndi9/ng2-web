export class Project {
  employer: string;
  title: string;
  category: string;
  role: string;
  url: string;
  start: Date;
  end: Date;
  description: string;
  summary: string;
  keywords: string[];
  highlights: string[];

  constructor() {
    this.employer = undefined;
    this.title = undefined;
    this.category = undefined;
    this.role = undefined;
    this.url = undefined;
    this.start = undefined;
    this.end = undefined;
    this.description = undefined;
    this.summary = undefined;
    this.keywords = undefined;
    this.highlights = undefined;
  }
}
