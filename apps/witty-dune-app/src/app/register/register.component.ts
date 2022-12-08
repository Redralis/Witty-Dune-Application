import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.ts.service';

@Component({
  selector: 'witty-dune-register',
  template: `
    <div class="wrapper">
      <div class="card post-card">
        <h4>Register account</h4>
        <p></p>
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
        <!-- Checkbox to make user agree to terms and conditions -->
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            [(ngModel)]="agreed"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            I agree to the
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              >terms and conditions</a
            >.
          </label>
        </div>
        <!-- End of checkbox to make user agree to terms and conditions -->
      </div>
      <button (click)="register()" class="btn btn-success bottom-button">
        Register
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
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  isAuthorized = false;
  agreed = false;

  constructor(private router: Router, private UserService: UserService) {}

  ngOnInit(): void {}

  async register(): Promise<void> {
    if (this.agreed) {
      const data = {
        username: this.user.username,
        password: this.user.password,
      };

      await this.UserService.register(data).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("SUNKBHJNAJKLS")
    }
  }
}
