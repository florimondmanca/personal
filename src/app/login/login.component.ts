import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: FormControl;
  password: FormControl;

  failed: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.username = new FormControl('');
    this.password = new FormControl('');
  }

  submit() {
    this.failed = false;
    this.auth.login(this.username.value, this.password.value).subscribe(
      () => this.router.navigate([this.auth.redirectUrl || '/']),
      (e) => this.failed = true,
    );
  }

  get formValid(): boolean {
    return this.username.valid && this.password.valid;
  }

}
