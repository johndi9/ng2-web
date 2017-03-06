import { SwiperConfigInterface } from 'angular2-swiper-wrapper';

export enum STATE_KEYS {
  CV_OPTION_SELECTED,
  MODAL_TYPE_OPENED
};

export enum EVENT_TYPES {
  CV_OPTION_CHANGED,
  MODAL_OPENED
};

export enum CV_OPTION_TYPES {
  PERSONAL_INFO,
  PROJECTS,
  EMPLOYS,
  EDUCATION,
  OTHER_INFO,
  CONTACT
};

export const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true,
  pagination: '.swiper-pagination'
};

export enum SCREEN_TYPES {
  TABLET_OR_LOWER = <any>'lt-md',
  DESKTOP_OR_BIGGER = <any>'gt-md'
};

export enum ANIMATION_TYPES {
  bounceInRight = <any>'bounceInRight',
  bounceOutRight = <any>'bounceOutRight',
  bounceInLeft = <any>'bounceInLeft',
  bounceOutLeft = <any>'bounceOutLeft',
  hideElement = <any>'hideElement',
};