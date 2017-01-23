import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Curriculum } from '../models/Curriculum/Curriculum';

@Injectable()
export class CurriculumService {
  private readonly urlCVStored: string = 'https://raw.githubusercontent.com/johndi9/PersonalCV/master/curriculum/personal-cv.json';

  private _resume: Curriculum;

  get resume(): Curriculum {
    if (!this._resume) {
      this.updateCurriculumJSON();
    }
    return this._resume;
  }

  set resume(value: Curriculum) {
    throw Error('The object ' + Curriculum.name + ' cannot be modified.');
  }

  constructor(private _httpService: HttpService) {
  }

  private updateCurriculumJSON(): void {
    this._httpService.getSingle(Curriculum, this.urlCVStored)
      .subscribe((response: Curriculum) => {
        this._resume = response;
      });
  }
}
