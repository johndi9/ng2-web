import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import { HomeActions } from '../../../actions/home-actions';
import { HomeService } from '../../../services/home.service';
import { ResizeService } from '../../../services/resize.service';

import { Curriculum } from '../../../models/Curriculum/Curriculum';

import { TAB_URL_PATHS } from '../../../variables/variables';


@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})

export class Home implements OnInit, OnDestroy, AfterViewInit {
  private resizeChangeSubscription: Subscription;

  cv$: Observable<Curriculum>;
  tabSelected$: Observable<number>;
  modalOpened$: Observable<{ index: number, type: number }>;

  private typeScreen: number;
  private rippleContainer: HTMLElement;

  constructor(private _resizeService: ResizeService,
              private _homeService: HomeService,
              private _homeActions: HomeActions,
              private _translate: TranslateService,
              private _element: ElementRef,
              private _router: Router) {
    this.linkUrlToState(this._router.url, true);
    _router.events.subscribe((nav) => {
      if (nav instanceof NavigationStart) {
        this.linkUrlToState(nav.url);
      }
    });
  }

  ngOnInit(): void {
    this._homeActions.loadCV(this._translate.currentLang);

    this.cv$ = this._homeService.cvs$
      .map(cv => cv[this._translate.currentLang])
      .filter(cv => !!cv);
    this.tabSelected$ = this._homeService.tabSelected$;
    this.modalOpened$ = this._homeService.modalOpened$;

    this.resizeChangeSubscription = this._resizeService.resizeChange
      .subscribe((typeScreen: number) => this.typeScreen = typeScreen);
  }

  ngOnDestroy(): void {
    this.resizeChangeSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.rippleContainer = this._element.nativeElement.querySelector('[md-ripple]');
  }

  private linkUrlToState(url: String, initial?: boolean): void {
    const option = this.getOptionSelected(url);
    const idModal = this.getModalIdSelected(url);
    if (idModal !== undefined) {
      this._homeActions.openModal(idModal, option);
      if (initial) {
        this._homeActions.changeTab(option);
      }
    } else {
      this._homeActions.changeTab(option);
      this._homeActions.closeModal(option);
    }
  }

  private getOptionSelected(url: String): number {
    const option = Object.keys(TAB_URL_PATHS).find(key => url.includes(TAB_URL_PATHS[key]));
    return parseInt(option);
  }

  private getModalIdSelected(url: String): number {
    const idModal = url.split("/")[2];
    return idModal && parseInt(idModal);
  }

}
