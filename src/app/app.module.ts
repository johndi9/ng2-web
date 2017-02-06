import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

// Providers/directives/pipes
import { ENV_PROVIDERS } from './environment';

// Services
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './services/app.service';
import { CurriculumService } from './services/curriculum.service';
import { HttpService } from './services/http.service';
import { NotificationService } from './services/notification.service';

// Components
import { AppComponent } from './app.component';
import { CvContainer } from './components/panels/home/cv-container/cv-container.component';
import { CvMenuWrapper } from './components/panels/home/cv-container/cv-menu-wrapper/cv-menu-wrapper.component';
import { EducationWrapper } from './components/panels/home/cv-container/education-wrapper/education-wrapper.component';
import { EmployerWrapper } from './components/panels/home/cv-container/employer-wrapper/employer-wrapper.component';
import { Home } from './components/pages/home/home.component';
import { LoadingScreen } from './components/layers/loading-screen/loading-screen.component';
import { Logo } from './components/panels/common/logo/logo.component';
import { Ng2Footer } from './components/panels/common/ng2-footer/ng2-footer.component';
import { Ng2Header } from './components/panels/common/ng2-header/ng2-header.component';
import { NoContent } from './components/pages/no-content/no-content.component';
import { OtherInfoWrapper } from './components/panels/home/cv-container/other-info-wrapper/other-info-wrapper.component';
import { PersonalInfoWrapper } from './components/panels/home/cv-container/personal-info-wrapper/personal-info-wrapper.component';
import { ProjectWrapper } from './components/panels/home/cv-container/project-wrapper/project-wrapper.component';
import { VideoBg } from './components/panels/home/video-bg/video-bg.component';

// External components
import { SwiperModule } from 'angular2-swiper-wrapper';
import { SWIPER_CONFIG } from './variables/variables';

// Routes
import { ROUTES } from './app.routes';

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
    EmployerWrapper,
    OtherInfoWrapper,
    PersonalInfoWrapper,
    ProjectWrapper
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    CurriculumService,
    HttpService,
    NotificationService
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

