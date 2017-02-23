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
  OTHER_INFO
};

export const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboardControl: true,
  pagination: '.swiper-pagination'
};

export enum ANIMATION_TYPES {
  bounceInRight = <any>'bounceInRight',
  bounceOutRight = <any>'bounceOutRight',
  bounceInDown = <any>'bounceInDown',
  bounceOutDown = <any>'bounceOutDown',
  hideElement = <any>'hideElement',
};

export const animationSettings = {
  duration: 500,
  delay: 100
};