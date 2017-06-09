import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

export enum TAB_OPTIONS {
  PERSONAL_INFO,
  PROJECTS,
  EMPLOYS,
  EDUCATION,
  OTHER_INFO,
  CONTACT
};

export const TAB_URL_PATHS = {
  0: 'personal',
  1: 'projects',
  2: 'employers',
  3: 'education',
  4: 'other',
  5: 'contact'
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
