import { Injectable, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _sidenav: MatSidenav;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  private ready = false;

  constructor(
    private media: MediaMatcher,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  init(sidenav: MatSidenav, changeDetectorRef: ChangeDetectorRef) {
    this._sidenav = sidenav;
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.ready = true;
  }

  destroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  onMobile(): boolean {
    // Always consider to be on mobile on the server, to avoid flickering during transition
    if (isPlatformServer(this.platformId)) {
      return true;
    }
    // If sidenav not ready yet, consider to be on mobile by default
    return this.ready ? this.mobileQuery.matches : true;
  }

  openOnDesktop() {
    if (!this.onMobile()) {
      this._sidenav.open();
    }
  }

  closeOnMobile() {
    if (this.onMobile()) {
      this._sidenav.close();
    }
  }

  get sidenav(): MatSidenav {
    return this._sidenav;
  }
}
