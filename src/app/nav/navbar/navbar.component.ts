import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { AuthService } from 'app/core';
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
  searchControl = new FormControl(null);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sub.add(this.auth.getUser().subscribe(
      () => this.loggedIn = this.auth.isLoggedIn,
    ));
  }

  performSearch() {
    this.router.navigate(['search', this.searchControl.value]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
