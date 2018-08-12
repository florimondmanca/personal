import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PageTitleService } from './core';

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
    private analytics: Angulartics2GoogleAnalytics,
    private router: Router,
  ) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.pageTitle.updateOnNavigate().subscribe());
    this.sub.add(this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd),
      debounceTime(100),  // don't mark fast navigation changes as navigating
      tap((e) => this.navigating = e instanceof NavigationStart),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
