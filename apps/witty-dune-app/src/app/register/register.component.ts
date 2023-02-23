import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.ts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'witty-dune-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };
  isAuthorized = false;
  agreed = false;
  errorMessage = '';
  hasError = false;

  constructor(
    private router: Router,
    private UserService: UserService,
    private _location: Location
  ) {}

  ngOnInit(): void {}

  async register(): Promise<void> {
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
  }

  validate(): void {
    if (!this.agreed) {
      this.hasError = true;
      this.errorMessage =
        'Please agree to the terms & conditions to register an account.';
    } else if (this.user.username == '' || this.user.password == '') {
      this.hasError = true;
      this.errorMessage = 'Please make sure every field has a value.';
    } else {
      this.register();
    }
  }

  backClicked() {
    this._location.back();
  }
}
