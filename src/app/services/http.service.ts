import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import MapUtils from '../utils/modelParser';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class HttpService {

  constructor(protected http: Http) {
  }

  public getSingle<T>(url: string, headers?: {}): Observable<T> {
    const observable: Observable<T> = this.createRequest(url, headers);

    observable.subscribe(
      data => data,
      error => Observable.throw(error));

    return observable;
  }

  private createRequest<T>(url: string, headers?: {}): Observable<T> {
    return this.http.get(url, headers ? { headers: new Headers(headers) } : null)
      .map((res: Response) => res.json())
      .catch(this.errorHandler)
      .share();
  }

  private errorHandler(error: any) {
    console.error(error);
    return Observable.throw(error);
  }
}
