import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  private defaultTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) {
    this.defaultTitle = this.title.getTitle();
  }

  private get(): Observable<string> {
    return this.router.events.pipe(
      // When a navigation finishes
      filter(event => event instanceof NavigationEnd),
      // Get the activated route object instead of the actual event
      map(() => this.route),
      // Traverse the child route path to get the last activated route
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      // Retrieve the route's data object
      filter(route => route.outlet == 'primary'),
      mergeMap(route => route.data),
      // Retrieve the route title
      map(data => data['title']),
      map((title: string) => this.defaultTitle + (title ? ' | ' + title : '')),
    );
  }

  updateOnNavigate(): Observable<string> {
    return this.get().pipe(
      tap((title) => this.title.setTitle(title)),
    );
  }
}
