import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CurriculumService {
  private readonly urlCVStored: string = 'https://raw.githubusercontent.com/johndi9/PersonalCV/master/curriculum/personal-cv.json';

  private _resume: any;

  get resume(): any {
    if (!this._resume) {
      this.updateCurriculumJSON();
    }
    return this._resume;
  }

  set resume(value: any) {
    this._resume = value;
  }

  constructor(protected http: Http) {
  }

  public updateCurriculumJSON(): void {
    this.http.get(this.urlCVStored)
      .map((res: Response) => res.json())
      .subscribe(
        data => {
          this.resume = data;
          console.log(data);
        },
        err => console.error(err),
        () => console.log('done')
      );
  }
}
