import { Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  private desktopQuery: MediaQueryList;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(media: MediaMatcher) {
    this.desktopQuery = media.matchMedia('(min-width: 600px)');
  }

  ngOnInit() {
    // Open sidenav by default on desktops
    if (this.desktopQuery.matches) {
      this.sidenav.open();
    }
  }

  toggleSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
