import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MdRipple } from '@angular/material';

import { AppState } from '../../../services/app.service';
import { CurriculumService } from '../../../services/curriculum.service';
import { NotificationService } from '../../../services/notification.service';
import { ResizeService } from '../../../services/resize.service';

import { Curriculum } from '../../../models/Curriculum/Curriculum';
import { ModalOpened } from '../../../models/Components/Events';

import { Subscription } from 'rxjs/Rx';

import { CV_OPTION_TYPES, STATE_KEYS } from '../../../variables/variables';


@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})

export class Home implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MdRipple) ripple: MdRipple;

  private curriculumLoadedSubscription: Subscription;
  private resizeChangeSubscription: Subscription;
  private modalOpenedSubscription: Subscription;

  private curriculum: Curriculum;
  private isMediumUpView: boolean;
  private typeModalOpened: CV_OPTION_TYPES;
  private rippleContainer: HTMLElement;

  constructor(private _appState: AppState,
              private _resizeService: ResizeService,
              private _curriculumService: CurriculumService,
              private _notificationService: NotificationService,
              private _element: ElementRef) {
  }

  ngOnInit(): void {
    this.retrieveCurriculum();

    this.resizeChangeSubscription = this._resizeService.resizeChange
      .subscribe((data: boolean) => this.isMediumUpView = data);

    this.modalOpenedSubscription = this._notificationService.modalOpened.subscribe((modalOpened: ModalOpened) => {
      this.updateModalOpenedState(modalOpened.type);
      this.updateModalOpened(modalOpened.type);
    });
  }

  ngOnDestroy(): void {
    this.curriculumLoadedSubscription.unsubscribe();
    this.resizeChangeSubscription.unsubscribe();
    this.modalOpenedSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.rippleContainer = this._element.nativeElement.querySelector('[md-ripple]');
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

  /**
   * Update modal opened state
   * @param type
   */
  private updateModalOpenedState(type: number): void {
    this._appState.set(STATE_KEYS[STATE_KEYS.MODAL_TYPE_OPENED], type);
  }

  /**
   * Update the modal opened to render the container animations
   * @param type
   */
  private updateModalOpened(type: number): void {
    this.typeModalOpened = type
  }

}
