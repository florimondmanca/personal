import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/auth';
import { ThemeService } from 'app/theming';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  loggedIn: boolean;
  private sub = new Subscription();

  constructor(private auth: AuthService, private themeService: ThemeService) { }

  ngOnInit() {
    this.sub.add(this.auth.getUser().subscribe(
      () => this.loggedIn = this.auth.isLoggedIn,
    ));
  }

  switchTheme() {
    this.themeService.switch();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
