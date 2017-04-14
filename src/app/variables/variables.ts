import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

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
  MOBILE,
  TABLET,
  DESKTOP
};

export enum ANIMATION_TYPES {
  bounceInRight = <any>'bounceInRight',
  bounceOutRight = <any>'bounceOutRight',
  bounceInLeft = <any>'bounceInLeft',
  bounceOutLeft = <any>'bounceOutLeft',
  hideElement = <any>'hideElement',
};

export const TABS = [
  {
    id: 0,
    iconName: 'fingerprint'
  },
  {
    id: 1,
    iconName: 'important_devices',
  },
  {
    id: 2,
    iconName: 'business_center',
  },
  {
    id: 3,
    iconName: 'school',
  },
  {
    id: 4,
    iconName: 'description',
  },
  {
    id: 5,
    iconName: 'email',
  }
];