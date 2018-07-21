import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PageTitleService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(private pageTitle: PageTitleService, private analytics: Angulartics2GoogleAnalytics) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.pageTitle.updateOnNavigate().subscribe());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
