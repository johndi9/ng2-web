import { Component } from '@angular/core';

import { CurriculumService } from '../../../services/curriculum.service';


@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})

export class Home {
  constructor(private _curriculumService: CurriculumService) {
    console.log(_curriculumService.resume);
  }
}
