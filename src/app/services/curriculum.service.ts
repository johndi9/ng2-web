import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

import { Curriculum } from '../models/Curriculum/Curriculum';
import { Employ } from '../models/Curriculum/Employ/Employ';
import { Project } from '../models/Curriculum/Project/Project';
import MapUtils from '../utils/modelParser';


@Injectable()
export class CurriculumService {
  private readonly urlCVStored: string = 'https://raw.githubusercontent.com/johndi9/PersonalCV/master/curriculum/personal-cv.json';

  constructor(private _httpService: HttpService) {
  }

  /**
   * Retrieve the curriculum json and parse it to the app model
   * @param lan
   * @returns {Observable<Curriculum>}
   */
  getCurriculum(lan: string): Observable<Curriculum> {
    const cvObservable: Observable<Curriculum> = this._httpService.getSingle(this.urlCVStored);

    cvObservable.subscribe(
      (data) => MapUtils.deserialize(Curriculum, data),
      (error: any) => Observable.throw(error));

    return cvObservable;
  }

  public getEmployerFromProject(employs: Employ[] = [], project: Project): Employ {
    return project && employs.find((employ: Employ) => employ.id === project.employerId);
  }

  public getProject(projects: Project[] = [], idProject: number): Project {
    return projects.find((project: Project) => project.id === idProject);
  }
}
