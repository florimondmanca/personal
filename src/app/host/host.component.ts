import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {

  private sub: Subscription;
  navigating = false;

  constructor(private router: Router) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd),
      tap((e) => this.navigating = e instanceof NavigationStart),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
