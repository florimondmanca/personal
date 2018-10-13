import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
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
