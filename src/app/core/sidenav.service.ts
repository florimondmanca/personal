import { Injectable, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _sidenav: MatSidenav;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(private media: MediaMatcher) { }

  init(sidenav: MatSidenav, changeDetectorRef: ChangeDetectorRef) {
    this._sidenav = sidenav;
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  destroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  onMobile(): boolean {
    return this.mobileQuery.matches;
  }

  openOnDesktop() {
    if (!this.onMobile()) {
      this._sidenav.open();
    }
  }

  get sidenav(): MatSidenav {
    return this._sidenav;
  }
}
