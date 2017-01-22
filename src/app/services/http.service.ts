import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import MapUtils from '../utils/modelParser';

import { Observable } from 'rxjs/Rx';


@Injectable()
export class HttpService {

  constructor(protected http: Http) {
  }

  public getSingle<T>(clazz: { new(): T }, url: string, headers?: {}): any {
    return this.createRequest(url, headers)
      .subscribe(data => {
        console.log(MapUtils.deserialize(clazz, data));
      }, (error: any) => {
        return Observable.throw(error);
      });
  }

  public getAll<T>(clazz: { new(): T }, url: string, headers?: {}) {
    return this.createRequest(url, headers)
      .subscribe(data => {
        MapUtils.deserialize(clazz, data);
      }, (error: any) => {
        return Observable.throw(error);
      });
  }

  private createRequest<T>(url: string, headers?: {}): Observable<{ bom: any }> {
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
