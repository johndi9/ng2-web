export class Education {
  institution: string;
  title: string;
  start: number;
  end: number;
  grade: string;
  summary: string;
  curriculum: string[];

  constructor() {
    this.institution = undefined;
    this.title = undefined;
    this.start = undefined;
    this.end = undefined;
    this.grade = undefined;
    this.summary = undefined;
    this.curriculum = undefined;
  }
}
