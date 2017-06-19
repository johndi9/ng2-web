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
  private lastUrl: string;

  private readonly DEFAULT_TAB: number = 0;

  constructor(private _resizeService: ResizeService,
              private _homeService: HomeService,
              private _homeActions: HomeActions,
              private _translate: TranslateService,
              private _element: ElementRef,
              private _router: Router) {
  }

  ngOnInit(): void {
    this.updateStateFromUrl(this._router.url, true);
    this._router.events.subscribe((nav) => {
      if (nav instanceof NavigationStart) {
        this.updateStateFromUrl(nav.url);
      }
    });

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

  private updateStateFromUrl(url: string, initial?: boolean): void {
    const option = this.getOptionSelected(url);
    const idModal = this.getModalIdSelected(url);

    if (idModal !== undefined) {
      this._homeActions.openModal(idModal, option);
      if (initial && option !== this.DEFAULT_TAB) {
        this._homeActions.changeTab(option);
      }
    } else {
      const lastIdModal = this.lastUrl && this.getModalIdSelected(this.lastUrl);

      if (lastIdModal !== undefined) {
        this._homeActions.closeModal(option);
      } else {
        this._homeActions.changeTab(option);
      }
    }

    this.lastUrl = url;
  }

  private getOptionSelected(url: string): number {
    const option = Object.keys(TAB_URL_PATHS).find(key => url.includes(TAB_URL_PATHS[key]));
    return option ? parseInt(option) : this.DEFAULT_TAB;
  }

  private getModalIdSelected(url: string): number {
    const idModal = url.split('/')[2];
    return idModal && parseInt(idModal);
  }

}
