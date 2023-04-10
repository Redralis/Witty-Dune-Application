import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.ts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'witty-dune-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
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

  constructor(
    private router: Router,
    private UserService: UserService,
    private _location: Location
  ) {}

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
        localStorage.setItem('username', this.res.username);
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

  backClicked() {
    this._location.back();
  }
}
