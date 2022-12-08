import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.ts.service';

@Component({
  selector: 'witty-dune-login',
  template: `
    <div class="wrapper">
      <div class="card post-card">
        <h4>Log in</h4><p></p>
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
      <button (click)="login()" class="btn btn-success bottom-button">
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
  ],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  isAuthorized = false;

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
        this.router.navigate(['/postlist']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
