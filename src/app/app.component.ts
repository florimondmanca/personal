import { Component, OnInit, OnDestroy, Inject, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';
import { Subscription, from } from 'rxjs';
import { filter, tap, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { PageTitleService, AnalyticsService } from './core';
import { CookieConsentService, CookieConsentPopupService } from './cookie-consent';
import { AppUpdatesService } from './app-updates';

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
    private cookieConsentPopup: CookieConsentPopupService,
    private analytics: AnalyticsService,

    private appUpdates: AppUpdatesService,
    private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: any,
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.pageTitle.updateOnNavigate().subscribe());

    // Update navigating on router events
    this.sub.add(this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel),
      debounceTime(100),  // don't mark fast navigation changes as navigating
      tap((e) => this.navigating = e instanceof NavigationStart),
    ).subscribe());

    if (!this.cookieConsent.hasAnswered()) {
      this.cookieConsentPopup.createFor(this.viewContainerRef);
    }

    // Configure Cookie Consent
    if (this.cookieConsent.hasConsented()) {
      this.analytics.activate();
    }
    this.sub.add(this.cookieConsent.onAllow().subscribe(
      () => this.analytics.activate()
    ));

    // Update app immediately when an update is available and user agreed
    this.appUpdates.init(this.viewContainerRef);
    this.sub.add(this.appUpdates.onUpdate().pipe(
      tap(() => this.document.location.reload()),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
