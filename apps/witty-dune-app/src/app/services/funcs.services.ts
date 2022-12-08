import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class FuncsService {
  helper = new JwtHelperService();
  token = localStorage.getItem('jwt') || '';
  isExpired = this.helper.isTokenExpired(this.token);

  constructor() {}

  isLoggedIn() {
    return this.isExpired;
  }
}
