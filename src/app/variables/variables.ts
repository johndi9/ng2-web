import { SwiperConfigInterface } from 'angular2-swiper-wrapper';

export enum STATE_KEYS {
  CV_OPTION_SELECTED
}

export enum EVENT_TYPES {
  CV_OPTION_CHANGED
}

export enum CV_OPTION_TYPES {
  PERSONAL_INFO,
  PROJECTS,
  EMPLOYS,
  EDUCATION,
  OTHER_INFO
}

export const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true,
  pagination: '.swiper-pagination'
}