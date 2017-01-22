import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Curriculum } from '../models/Curriculum/Curriculum';

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

  constructor(private _httpService: HttpService) {
  }

  public updateCurriculumJSON(): void {
    this._httpService.getSingle(Curriculum, this.urlCVStored);
  }
}
