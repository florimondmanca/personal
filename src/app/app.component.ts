import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet, NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.sub = this.title().subscribe(
      (title) => this.titleService.setTitle(title)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private title(): Observable<string> {
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
      filter(title => title),
      map(title => 'Florimond Manca' + (title ? ' | ' + title : ''))
    );
  }
}
