import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject, from } from 'rxjs';
import { tap, map, filter, mergeMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  adminSiteUrl = environment.adminSiteUrl;
  private sub = new Subscription();
  searchControl = new FormControl(null);
  private search$: Subject<void> = new Subject();
  private searching = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sub.add(this.auth.getUser().subscribe(
      () => this.loggedIn = this.auth.isLoggedIn,
    ));
    this.sub.add(this.search$.asObservable().pipe(
      map(() => this.searchControl.value),
      debounceTime(400),
      distinctUntilChanged(),
      filter(() => !this.searching),
      tap(() => this.searching = true),
      map((term) => term ? ['search', term] : ['/']),
      mergeMap((route) => this.router.navigate(route)),
      tap(() => this.searching = false),
    ).subscribe());
  }

  onSearchChange() {
    this.search$.next();
  }

  performSearch() {
    this.search$.next();
  }

  resetSearchTerm() {
    this.searchControl.reset();
    this.search$.next();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
