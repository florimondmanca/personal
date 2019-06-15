import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';
import { DescriptionService, SidenavService } from 'app/core';
import { Post, CursorPaginator, BlogLayoutService } from 'app/blogging-core';
import { CardService } from 'app/social';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;
  paginator: CursorPaginator<Post>;

  constructor(
    private route: ActivatedRoute,
    private cards: CardService,
    private title: Title,
    private description: DescriptionService,
    private sidenavService: SidenavService,
    private changeDetectorRef: ChangeDetectorRef,
    private blogLayoutService: BlogLayoutService
  ) { }

  ngOnInit() {
    this.paginator = this.route.snapshot.data.paginator;
    this.setUpCards();
    this.sidenavService.init(this.sidenav, this.changeDetectorRef);
    this.sidenavService.openOnDesktop();
    this.sidenavService.closeOnMobile();
    this.blogLayoutService.isHome$.next(true);
  }

  private setUpCards() {
    this.cards.configure({
      title: this.title.getTitle(),
      description: this.description.get(),
    })
  }

  onSwipeLeft() {
    this.sidenavService.sidenav.open();
  }

  onSwipeRight() {
    this.sidenavService.sidenav.close();
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
    this.blogLayoutService.isHome$.next(false);
  }
}
