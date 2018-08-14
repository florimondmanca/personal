import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User, ANONYMOUS_USER } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = environment.apiUrl + '/login/';
  private user$: BehaviorSubject<User>;
  redirectUrl: string;
  inBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.inBrowser = isPlatformBrowser(platformId);
    this.user$ = new BehaviorSubject(this.user);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      tap((data: any) => this.token = data.token),
      map((data: any) => data.user),
      map((user: any) => new User(user.id, user.is_admin)),
      tap((user: User) => this.user = user),
    );
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  redirectLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.token = null;
    this.user = null;
  }

  private set token(token: string) {
    if (!token) {
      localStorage.removeItem('auth-token');
    } else {
      localStorage.setItem('auth-token', token);
    }
  }

  private get token(): string {
    if (this.inBrowser) {
      return localStorage.getItem('auth-token');
    } else {
      // Always non-authenticated on the server
      return null;
    }
  }

  private set user(user: User) {
    if (!user) {
      localStorage.removeItem('auth-user');
      this.user$.next(ANONYMOUS_USER);
    } else {
      localStorage.setItem('auth-user', JSON.stringify(user));
      this.user$.next(user);
    }
  }

  private get user(): User {
    if (this.inBrowser) {
      const userRaw: string = localStorage.getItem('auth-user');
      const user: any = userRaw ? JSON.parse(userRaw) : null;
      console.log(user);
      return user ? new User(user.id, user.isAdmin) : ANONYMOUS_USER;
    } else {
      return ANONYMOUS_USER;
    }
  }

  userSnapshot(): User {
    return this.user$.getValue();
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }


  addHeaders(headers: HttpHeaders): HttpHeaders {
    return headers.set('Authorization', 'Token ' + this.token);
  }
}
