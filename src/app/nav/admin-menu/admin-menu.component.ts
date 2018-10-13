import { Component } from '@angular/core';
import { AuthService } from 'app/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {

  adminSiteUrl = environment.adminSiteUrl;

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
