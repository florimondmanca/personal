import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: FormControl;
  password: FormControl;

  faSpinner = faSpinner;

  loading = false;
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
    this.loading = true;
    this.auth.login(this.username.value, this.password.value).subscribe(
      () => {
        this.router.navigate([this.auth.redirectUrl || '/']);
      },
      () => {
        this.failed = true;
        this.loading = false;
      },
    );
  }

  get formValid(): boolean {
    return this.username.valid && this.password.valid;
  }

}
