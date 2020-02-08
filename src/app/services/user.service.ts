import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndexResult } from '../models/index-result';
import { loginUrl } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(loginInfo):Observable<IndexResult<any>>{
    return this.http.post<IndexResult<any>>(loginUrl, loginInfo);
  }


}
