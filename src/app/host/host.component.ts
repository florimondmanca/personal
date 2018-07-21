import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ScrollService } from 'app/core';


@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {

  private sub: Subscription;

  constructor(
    private router: Router,
    private scroll: ScrollService,
  ) { }

  ngOnInit() {
    this.sub = this.onNavigationEnd().subscribe(
      () => this.scroll.toTop()
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private onNavigationEnd() {
    return this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    );
  }
}
