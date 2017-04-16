export class Project {
  id: number;
  employerId: number;
  title: string;
  category: string;
  role: string;
  url: string;
  download: string;
  logo: string;
  backgroundColor: string;
  color: string;
  start: Date;
  end: Date;
  description: string;
  summary: string;
  keywords: string[];
  highlights: string[];

  constructor() {
    this.id = undefined;
    this.employerId = undefined;
    this.title = undefined;
    this.category = undefined;
    this.role = undefined;
    this.url = undefined;
    this.download = undefined;
    this.logo = undefined;
    this.backgroundColor = undefined;
    this.color = undefined;
    this.start = undefined;
    this.end = undefined;
    this.description = undefined;
    this.summary = undefined;
    this.keywords = undefined;
    this.highlights = undefined;
  }
}
