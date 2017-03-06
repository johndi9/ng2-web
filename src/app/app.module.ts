import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

// Providers/directives/pipes
import { ENV_PROVIDERS } from './environment';

// Services
import { AnimationService } from './services/animation.service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './services/app.service';
import { CurriculumService } from './services/curriculum.service';
import { DialogService } from './services/dialog.service';
import { HttpService } from './services/http.service';
import { NotificationService } from './services/notification.service';
import { ResizeService } from './services/resize.service';

// Components
import { AppComponent } from './app.component';
import { Card } from './components/panels/common/card/card.component';
import { ContactWrapper } from './components/panels/home/cv-container/contact-wrapper/contact-wrapper.component';
import { CvContainer } from './components/panels/home/cv-container/cv-container.component';
import { CvMenuWrapper } from './components/panels/home/cv-container/cv-menu-wrapper/cv-menu-wrapper.component';
import { EducationWrapper } from './components/panels/home/cv-container/education-wrapper/education-wrapper.component';
import { EmployDialog } from './components/panels/home/dialogs/employ-dialog/employ-dialog.component';
import { EmployWrapper } from './components/panels/home/cv-container/employ-wrapper/employ-wrapper.component';
import { Home } from './components/pages/home/home.component';
import { LoadingScreen } from './components/layers/loading-screen/loading-screen.component';
import { Logo } from './components/panels/common/logo/logo.component';
import { Ng2Footer } from './components/panels/common/ng2-footer/ng2-footer.component';
import { Ng2Header } from './components/panels/common/ng2-header/ng2-header.component';
import { NoContent } from './components/pages/no-content/no-content.component';
import { OtherInfoWrapper } from './components/panels/home/cv-container/other-info-wrapper/other-info-wrapper.component';
import { PersonalInfoWrapper } from './components/panels/home/cv-container/personal-info-wrapper/personal-info-wrapper.component';
import { ProjectDialog } from './components/panels/home/dialogs/project-dialog/project-dialog.component';
import { ProjectWrapper } from './components/panels/home/cv-container/project-wrapper/project-wrapper.component';
import { VideoBg } from './components/panels/home/video-bg/video-bg.component';

// External components
import 'hammerjs';
import { MomentModule } from 'angular2-moment';
import { SWIPER_CONFIG } from './variables/variables';
import { SwiperModule } from 'angular2-swiper-wrapper';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// Directives
import { AnimationDirective } from './directives/animation.directive';

// Routes
import { ROUTES } from './app.routes';

// Pipes
import { MonthsDurationPipe } from './pipes/months-duration.pipe';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    Home,
    NoContent,
    Ng2Footer,
    Ng2Header,
    LoadingScreen,
    Logo,
    VideoBg,
    CvContainer,
    CvMenuWrapper,
    EducationWrapper,
    EmployWrapper,
    OtherInfoWrapper,
    PersonalInfoWrapper,
    ProjectWrapper,
    ContactWrapper,
    Card,
    ProjectDialog,
    EmployDialog,
    MonthsDurationPipe,
    AnimationDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    MaterialModule,
    FlexLayoutModule,
    SwiperModule.forRoot(SWIPER_CONFIG),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    CurriculumService,
    HttpService,
    NotificationService,
    ResizeService,
    AnimationService,
    DialogService
  ],
  entryComponents: [
    ProjectDialog,
    EmployDialog
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

