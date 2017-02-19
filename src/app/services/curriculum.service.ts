import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Curriculum } from '../models/Curriculum/Curriculum';

import { Observable, Subscription } from 'rxjs/Rx';
import MapUtils from '../utils/modelParser';


@Injectable()
export class CurriculumService {
  private readonly urlCVStored: string = 'https://raw.githubusercontent.com/johndi9/PersonalCV/master/curriculum/personal-cv.json';

  private _curriculum: Curriculum;

  get curriculum(): Curriculum {
    return this._curriculum;
  }

  set curriculum(value: Curriculum) {
    throw Error('The object ' + Curriculum.name + ' cannot be modified.');
  }

  constructor(private _httpService: HttpService) {
  }

  /**
   * Retrieve the curriculum json and parte it to the app model
   * @returns {Subscription}
   */
  public updateCurriculumJSON(): Observable<Curriculum> {
    const cvObservable: Observable<Curriculum> = this._httpService.getSingle(this.urlCVStored);

    cvObservable.subscribe(
      (data) => this._curriculum = MapUtils.deserialize(Curriculum, data),
      (error: any) => Observable.throw(error));

    return cvObservable;
  }
}
