import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable, Subject, tap } from 'rxjs';
import { LoginResult } from './login-result';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey: string = 'jwt-token';
  private _authStatus = new Subject<boolean>();
  private _adminStatus = new Subject<boolean>();

  public authStatus = this._authStatus.asObservable();
  public adminStatus = this._adminStatus.asObservable();

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    }
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }

  setAdminStatus(isAdmin: boolean) {
    this._adminStatus.next(isAdmin)
  }

  constructor(protected http: HttpClient) { }

  isAuthenticated() : boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(item: LoginRequest): Observable<LoginResult> {
      var url = environment.baseUrl + 'api/Account';
      return this.http.post<LoginResult>(url, item)
      .pipe(tap((loginResult: LoginResult) => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
          this.isAdmin()
        }
      }));
  }

  isAdmin(): Observable<boolean> {
    var url = environment.baseUrl + 'api/Account/IsAdmin';
    var item = this.getToken();
    
    var res = this.http.post<boolean>(url, item)
    .pipe(tap((result: boolean) => {
      console.log("HERE: ", result)
      if (result) this.setAdminStatus(true)
    }))

    console.log("RES: ", res)
    return res
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }
}