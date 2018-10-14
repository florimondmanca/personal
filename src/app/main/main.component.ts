import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from 'app/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.sidenavService.init(this.sidenav, this.changeDetectorRef);
  }

  onSwipeLeft() {
    if (this.sidenavService.sidenav.opened) {
      this.sidenavService.sidenav.close();
    }
  }

  onSwipeRight() {
    if (!this.sidenavService.sidenav.opened) {
      this.sidenavService.sidenav.open();
    }
  }

  toggleSidenav() {
    if (this.sidenavService.sidenav.opened) {
      this.sidenavService.sidenav.close();
    } else {
      this.sidenavService.sidenav.open();
    }
  }

  get onMobile(): boolean {
    return this.sidenavService.onMobile();
  }

  ngOnDestroy() {
    this.sidenavService.destroy();
  }
}
