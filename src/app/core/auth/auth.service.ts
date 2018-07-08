import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User, ANONYMOUS_USER } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = environment.apiUrl + '/login/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      tap((data: any) => this.token = data.token),
      map((data: any) => data.user),
      map((user: any) => ({ id: user.id, isAdmin: user.is_admin })),
      tap((user: User) => this.user = user),
    );
  }

  isLoggedIn(): boolean {
    return !!this.token;
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
    return localStorage.getItem('auth-token');
  }

  private set user(user: User) {
    if (!user) {
      localStorage.removeItem('auth-user');
    } else {
      localStorage.setItem('auth-user', JSON.stringify(user));
    }
  }

  getUser(): User {
    const userRaw: string = localStorage.getItem('auth-user');
    const user: any = userRaw ? JSON.parse(userRaw) : null;
    return user ? new User(user.id, user.isAdmin) : ANONYMOUS_USER;
  }


  addHeaders(headers: HttpHeaders): HttpHeaders {
    return headers.set('Authorization', 'Token ' + this.token);
  }
}
