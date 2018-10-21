import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter, tap, debounceTime } from 'rxjs/operators';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { PageTitleService, AnalyticsService } from './core';
import { CookieConsentService, CookieConsentPopupService } from './cookie-consent';
import { AppUpdatesService } from './app-updates';
import { ThemeService, Theme } from './theming';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;
  navigating = false;
  error = false;
  theme: Theme;

  constructor(
    private pageTitle: PageTitleService,
    private angulartics2: Angulartics2GoogleAnalytics,
    private router: Router,
    private cookieConsent: CookieConsentService,
    private cookieConsentPopup: CookieConsentPopupService,
    private analytics: AnalyticsService,
    private themeService: ThemeService,
    private appUpdates: AppUpdatesService,
    @Inject(DOCUMENT) private document: any,
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.pageTitle.updateOnNavigate().subscribe());

    // Update navigating on router events
    this.sub.add(this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel),
      debounceTime(10),  // don't mark fast navigation changes as navigating
      tap((e) => this.navigating = e instanceof NavigationStart),
    ).subscribe());

    // Configure Cookie Consent
    if (!this.cookieConsent.hasAnswered()) {
      this.cookieConsentPopup.createLater().subscribe();
    }
    if (this.cookieConsent.hasConsented()) {
      this.analytics.activate();
    }
    this.sub.add(this.cookieConsent.onAllow().subscribe(
      () => this.analytics.activate()
    ));

    // Update app immediately when an update is available and user agreed
    this.sub.add(this.appUpdates.onUpdate().pipe(
      tap(() => this.document.location.reload()),
    ).subscribe());

    this.sub.add(this.themeService.getTheme().pipe(
      tap((theme) => this.theme = theme),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
