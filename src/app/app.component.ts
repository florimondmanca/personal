import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { PageTitleService, AnalyticsService } from './core';
import { CookieConsentService } from './cookie-consent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;
  navigating = false;
  error = false;

  constructor(
    private pageTitle: PageTitleService,
    private angulartics2: Angulartics2GoogleAnalytics,
    private router: Router,
    private cookieConsent: CookieConsentService,
    private analytics: AnalyticsService,
    private view: ViewContainerRef,
  ) {
    this.sub = new Subscription();
  }

  // constructor(@Inject(Service) service,
  //             @Inject(ViewContainerRef) viewContainerRef) {
  //   service.setRootViewContainerRef(viewContainerRef)
  //   service.addDynamicComponent()
  // }

  ngOnInit() {
    this.sub.add(this.pageTitle.updateOnNavigate().subscribe());

    // Update navigating on router events
    this.sub.add(this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel),
      debounceTime(100),  // don't mark fast navigation changes as navigating
      tap((e) => this.navigating = e instanceof NavigationStart),
    ).subscribe());

    this.cookieConsent.init(this.view);

    // Configure Cookie Consent
    if (this.cookieConsent.hasConsented()) {
      this.analytics.activate();
    }
    this.sub.add(this.cookieConsent.onAllow().subscribe(
      () => this.analytics.activate()
    ));
    this.sub.add(this.cookieConsent.onRevoke().subscribe(
      () => this.analytics.deactivate()
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
