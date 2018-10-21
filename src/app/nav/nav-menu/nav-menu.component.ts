import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/auth';
import { ThemeService } from 'app/theming';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  adminSiteUrl = environment.adminSiteUrl;
  private sub = new Subscription();

  constructor(private auth: AuthService, private themeService: ThemeService) { }

  ngOnInit() {
    this.sub.add(this.auth.getUser().subscribe(
      () => this.loggedIn = this.auth.isLoggedIn,
    ));
  }

  logout() {
    this.auth.logout();
  }

  switchTheme() {
    this.themeService.switch();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
