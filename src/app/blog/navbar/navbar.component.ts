import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  canAdd: boolean;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.canAdd = this.auth.getUser().permissions.canAddPost;
  }
}
