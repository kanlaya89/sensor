import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  url : string;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { 
    this.url = "http://localhost:3001/";   
  }

  register(data: Object): Promise<any>{
    return this.http
      .post(this.url+'register', JSON.stringify(data), {headers: this.headers})
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  isRegisteredHostname(): Promise<any>{
    return this.http
      .get(this.url+'isRegisteredHostname')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
