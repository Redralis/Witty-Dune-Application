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
    email: '',
    country: '',
    firstname: '',
    lastname: '',
    dateofbirth: new Date().toISOString(),
    profilepic: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
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
    if (this.user.dateofbirth) this.user.dateofbirth = new Date(this.user.dateofbirth).toISOString();
    const data = {
      ...this.user,
    };

    await this.UserService.register(data).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.setError(true, res.message);
        if (res.message == 'User registered successfully.') {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.setError(true, error.message);
        if (error.message == 'User registered successfully.') {
          this.router.navigate(['/login']);
        }
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

  setError(hasError: boolean, errorMessage: string): void {
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  }
  
}
