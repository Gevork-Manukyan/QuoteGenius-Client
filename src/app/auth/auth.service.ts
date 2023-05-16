import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { Observable, Subject, map, of, tap } from 'rxjs';
import { LoginResult } from './login-result';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey: string = 'jwt-token';
  private _authStatus = new Subject<boolean>();
  private _adminStatus = new Subject<boolean>();
  // private _isAdminLoaded = new Subject<boolean>();

  public authStatus = this._authStatus.asObservable();
  public adminStatus = this._adminStatus.asObservable();
  // public isAdminLoaded = this._isAdminLoaded.asObservable();

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    } else {
      this.setAuthStatus(false);
      this.setAdminStatus(false); 
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
        }
      }));
  }

  isAdmin(): Observable<boolean> {
    const url = environment.baseUrl + 'api/Account/IsAdmin';
    const isAdminCached = JSON.parse(localStorage.getItem('isAdmin') || 'false');
  
    console.log("CACHE: ", isAdminCached)
    if (isAdminCached) {
      this.setAdminStatus(isAdminCached);
      return of(isAdminCached);

    } else {
      return this.http.get<{ isAdmin: boolean }>(url).pipe(
        map((result: { isAdmin: boolean }) => {
          this.setAdminStatus(result.isAdmin);
          localStorage.setItem('isAdmin', JSON.stringify(result.isAdmin));
          return result.isAdmin;
        })
      );
    }
  }
  
  

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('isAdmin'); 
    this.setAuthStatus(false);
    this.setAdminStatus(false);
  }
  
}