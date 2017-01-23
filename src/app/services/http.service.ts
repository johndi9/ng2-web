import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import MapUtils from '../utils/modelParser';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class HttpService {

  constructor(protected http: Http) {
  }

  public getSingle<T>(clazz: { new(): T }, url: string, headers?: {}): Observable<T> {
    const observable: Observable<T> = this.createRequest(url, headers);

    observable.subscribe(
      data => MapUtils.deserialize(clazz, data),
      error => Observable.throw(error));

    return observable;
  }

  public getAll<T>(clazz: { new(): T }, url: string, headers?: {}): Observable<T> {
    const observable: Observable<T> = this.createRequest(url, headers);

    observable.subscribe(
      (data: any) => data.forEach(dataElem => MapUtils.deserialize(clazz, dataElem)),
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
