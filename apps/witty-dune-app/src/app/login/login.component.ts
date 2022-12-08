import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.ts.service';

@Component({
  selector: 'witty-dune-login',
  template: `
    <div class="wrapper">
      <div class="card post-card">
        <h4>Log in</h4>
        <div *ngIf="hasError" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <!-- Input for username -->
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            required
            [(ngModel)]="user.username"
            name="username"
          />
        </div>
        <!-- End of input for username -->

        <!-- Input for password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            class="form-control"
            type="password"
            id="password"
            required
            [(ngModel)]="user.password"
            name="password"
          />
        </div>
        <!-- End of input for password -->
      </div>
      <button (click)="validate()" class="btn btn-success bottom-button">
        Log in
      </button>
    </div>
  `,
  styles: [
    'button { background-color: #0E246D !important; margin-top: 15px; margin-right: 16px; width: 30%; } ',
    '.post-card { padding: 12px 35px; }',
    '.wrapper { margin-bottom: 25px; margin-right: 10px; margin-top: 10px; margin-left: -15px; }',
    '.bottom-button { margin-top: 15px; }',
    '.bottom-col { padding: 0px }',
    'h4 { margin-bottom: 20px }',
  ],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  isAuthorized = false;
  errorMessage = '';
  hasError = false;
  res: any;

  constructor(private router: Router, private UserService: UserService) {}

  ngOnInit(): void {}

  async login(): Promise<void> {
    const data = {
      username: this.user.username,
      password: this.user.password,
    };

    await this.UserService.login(data).subscribe(
      (response) => {
        console.log(response);
        this.res = response;
        localStorage.setItem('jwt', this.res.access_token);
        this.router.navigate(['/postlist']).then(() => {
          this.refresh();
        });
      },
      (error) => {
        console.log(error);
        this.hasError = true;
        this.errorMessage = 'Username or password incorrect.';
      }
    );
  }

  validate(): void {
    if (this.user.username == '' || this.user.password == '') {
      this.hasError = true;
      this.errorMessage = 'Please make sure every field has a value.';
    } else {
      this.login();
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
