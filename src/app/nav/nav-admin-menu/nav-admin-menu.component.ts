import { Component } from '@angular/core';
import { AuthService } from 'app/auth';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-nav-admin-menu',
  templateUrl: './nav-admin-menu.component.html',
  styleUrls: ['./nav-admin-menu.component.scss']
})
export class NavAdminMenuComponent {

  adminSiteUrl = environment.adminSiteUrl;

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
