import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { Theme } from './theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme$: BehaviorSubject<Theme>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.theme$ = new BehaviorSubject(this.getInitialTheme());
  }

  private getInitialTheme(): Theme {
    // TODO retrieve from user preferences
    if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('app-theme') as Theme || 'light';
    } else {
      // On the server, localStorage is not accessible, but we don't actually care.
      return 'light';
    }
  }

  getTheme(): Observable<Theme> {
    return this.theme$.asObservable();
  }

  private setTheme(theme: Theme) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('app-theme', theme as string);
    }
    this.theme$.next(theme);
  }

  switch() {
    let newTheme: Theme;
    switch (this.theme$.getValue()) {
      case 'light': newTheme = 'dark'; break;
      case 'dark': newTheme = 'light'; break;
    }
    this.setTheme(newTheme);
  }
}
