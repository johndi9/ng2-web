import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Curriculum } from '../models/Curriculum/Curriculum';


@Injectable()
export class HomeService {
  cvs$: Observable<[{ [lan: string]: Curriculum }]>;
  tabSelected$: Observable<number>;
  modalOpened$: Observable<{ index: number, type: number }>;

  constructor(private store: Store<any>) {
    this.cvs$ = store.select('home').map(hr => hr['cvs']);
    this.tabSelected$ = store.select('home').map(hr => hr['tabSelected']);
    this.modalOpened$ = store.select('home').map(hr => hr['modalOpened']);
  }
}
