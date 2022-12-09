import { Component, OnInit } from '@angular/core';
import { FuncsService } from '../services/funcs.services';

@Component({
  selector: 'witty-dune-navbar',
  template: ` <!-- Navbar -->
    <nav
      class="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark border-bottom box-shadow mb-3 bg-blue-green"
    >
      <div class="container-fluid">
        <img src="assets/images/logo-small.png" alt="Image of the logo" />
        <a class="navbar-brand">Witty Dune</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar-collapse collapse d-sm-inline-flex justify-content-between"
        >
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/postlist"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/about"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >About</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/gamelist"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >Games</a
              >
            </li>
          </ul>
          <div *ngIf="isExpired" class="">
            <ul class="navbar-nav flex-grow-2">
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/login"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  >Login</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/register"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  >Register</a
                >
              </li>
            </ul>
          </div>
          <div *ngIf="!isExpired" class="">
            <ul class="navbar-nav flex-grow-2">
              <li class="nav-item">
                <a
                  class="nav-link"
                  ariaCurrentWhenActive="page"
                  (click)="logout()"
                  style="cursor: pointer;"
                  >Logout</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/profile"
                  routerLinkActive="active"
                  ariaCurrentWhenActive="page"
                  style="cursor: pointer;"
                  >{{ this.username }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>`,
  styles: [
    'nav { background-color: #0E246D !important; color: white; }',
    'nav img { width: 50px; margin-right: 10px; }',
  ],
})
export class NavbarComponent implements OnInit {
  isExpired = false;
  username = localStorage.getItem('username')

  constructor(private funcs: FuncsService) {}

  ngOnInit(): void {
    this.isExpired = this.funcs.isLoggedIn();
  }

  logout(): void {
    localStorage.setItem('jwt', '');
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
