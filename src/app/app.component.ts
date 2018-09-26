import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';

import { PageTitleService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;
  cookieSub: Subscription;
  navigating = false;
  error = false;

  constructor(
    private pageTitle: PageTitleService,
    private analytics: Angulartics2GoogleAnalytics,
    private router: Router,
    private ccService: NgcCookieConsentService,
  ) {
    this.sub = new Subscription();
    this.cookieSub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.pageTitle.updateOnNavigate().subscribe());
    // Update navigating on router events
    this.sub.add(this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel),
      debounceTime(100),  // don't mark fast navigation changes as navigating
      tap((e) => this.navigating = e instanceof NavigationStart),
    ).subscribe());
    this.configureCookieConsent();
  }

  private configureCookieConsent() {
    // subscribe to cookieconsent observables to react to main events
    this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );
    this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );

    this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.cookieSub.unsubscribe();
  }
}
