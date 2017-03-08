import { Component, OnInit, OnDestroy } from '@angular/core';

import { CurriculumService } from '../../../services/curriculum.service';
import { ResizeService } from '../../../services/resize.service';

import { Curriculum } from '../../../models/Curriculum/Curriculum';

import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})

export class Home implements OnInit, OnDestroy {
  private curriculumLoadedSubscription: Subscription;
  private resizeChangeSubscription: Subscription;

  private curriculum: Curriculum;
  private isMediumUpView: boolean;

  constructor(private _resizeService: ResizeService,
              private _curriculumService: CurriculumService) {
  }

  ngOnInit(): void {
    this.retrieveCurriculum();

    this.resizeChangeSubscription = this._resizeService.resizeChange
      .subscribe((data: boolean) => this.isMediumUpView = data);
  }

  ngOnDestroy(): void {
    this.curriculumLoadedSubscription.unsubscribe();
    this.resizeChangeSubscription.unsubscribe();
  }

  /**
   * Retrieve the curriculum based on the observable
   */
  private retrieveCurriculum(): void {
    if (this._curriculumService.curriculum) {
      this.curriculum = this._curriculumService.curriculum
    } else {
      this.curriculumLoadedSubscription = this._curriculumService.updateCurriculumJSON()
        .subscribe(() => this.curriculum = this._curriculumService.curriculum);
    }
  }
}
