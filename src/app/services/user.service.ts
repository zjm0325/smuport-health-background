import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { loginUrl } from '../base-url';
import { LocalStorageService } from './local-storage.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }


  login(username: string, password: string) {
    const loginInfo = new FormData();
    loginInfo.set('username', username);
    loginInfo.set('password', password);
    return this.http.post<Result<any>>( loginUrl , loginInfo)
    .pipe(
      map(result => {
        this.localStorageService.setItem('userName', username);
        this.localStorageService.setItem('access-token', result.data.access);
        this.localStorageService.setItem('refresh-token', result.data.refresh);
        console.log(result);
        return result;
      })
    );
  }


}
