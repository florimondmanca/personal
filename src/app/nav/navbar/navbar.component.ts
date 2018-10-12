import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'app/core';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  adminSiteUrl = environment.adminSiteUrl;
  private sub = new Subscription();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.sub.add(this.auth.getUser().subscribe(
      () => this.loggedIn = this.auth.isLoggedIn,
    ));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
