import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';

// Providers/directives/pipes
import { ENV_PROVIDERS } from './environment';

// Services
import { CurriculumService } from './services/curriculum.service';
import { DialogService } from './services/dialog.service';
import { GoogleMapsService } from './services/googleMaps.service';
import { InjectionService } from './services/injection.service';
import { HttpService } from './services/http.service';
import { ResizeService } from './services/resize.service';

// Components
import { AppComponent } from './app.component';
import { Card } from './components/panels/common/card/card.component';
import { CardDateRange } from './components/panels/common/card/card-date-range/card-date-range.component';
import { ContactWrapper } from './components/panels/home/cv-container/contact-wrapper/contact-wrapper.component';
import { CommonWrapper } from './components/panels/home/cv-container/common-wrapper/common-wrapper.component';
import { CvContainer } from './components/panels/home/cv-container/cv-container.component';
import { CvContainerLoading } from './components/panels/home/cv-container-loading/cv-container-loading.component';
import { CvMenuWrapper } from './components/panels/home/cv-container/cv-menu-wrapper/cv-menu-wrapper.component';
import { EducationWrapper } from './components/panels/home/cv-container/education-wrapper/education-wrapper.component';
import { EmployDialog } from './components/panels/home/dialogs/employ-dialog/employ-dialog.component';
import { EmployWrapper } from './components/panels/home/cv-container/employ-wrapper/employ-wrapper.component';
import { Home } from './components/pages/home/home.component';
import { LoadingScreen } from './components/layers/loading-screen/loading-screen.component';
import { Logo } from './components/panels/common/logo/logo.component';
import { ModuleLoadingWrapper } from './components/panels/home/cv-container-loading/module-loading-wrapper/module-loading-wrapper.component';
import { Ng2Footer } from './components/panels/common/ng2-footer/ng2-footer.component';
import { Ng2Header } from './components/panels/common/ng2-header/ng2-header.component';
import { Ng2Ripple } from './components/panels/common/ng2-ripple/ng2-ripple.component';
import { NoContent } from './components/pages/no-content/no-content.component';
import { OtherInfoWrapper } from './components/panels/home/cv-container/other-info-wrapper/other-info-wrapper.component';
import { PersonalInfoWrapper } from './components/panels/home/cv-container/personal-info-wrapper/personal-info-wrapper.component';
import { ProjectDialog } from './components/panels/home/dialogs/project-dialog/project-dialog.component';
import { ProjectWrapper } from './components/panels/home/cv-container/project-wrapper/project-wrapper.component';
import { ShareButton } from './components/panels/home/share-button/share-button.component';
import { SidebarLoadingWrapper } from './components/panels/home/cv-container-loading/sidebar-loading-wrapper/sidebar-loading-wrapper.component';
import { VideoBg } from './components/panels/home/video-bg/video-bg.component';

// External components
import 'hammerjs';
import { MomentModule } from 'angular2-moment';
import { SWIPER_CONFIG } from './variables/variables';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Routes
import { ROUTES } from './app.routes';

// Pipes
import { MonthsDurationPipe } from './pipes/months-duration.pipe';


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
    CvContainerLoading,
    CommonWrapper,
    ModuleLoadingWrapper,
    SidebarLoadingWrapper,
    Ng2Ripple,
    CardDateRange,
    ShareButton
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LazyLoadImageModule,
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
    CurriculumService,
    HttpService,
    ResizeService,
    DialogService,
    InjectionService,
    GoogleMapsService
  ],
  entryComponents: [
    ProjectDialog,
    EmployDialog,
    Ng2Ripple
  ]
})

export class AppModule {
  constructor() {
  }
}

