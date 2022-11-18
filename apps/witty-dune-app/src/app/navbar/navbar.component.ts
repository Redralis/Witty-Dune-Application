import { Component, OnInit } from '@angular/core';

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
              <a class="nav-link"
              routerLink="/postlist"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
              >Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
              routerLink="/about"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
              >About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
              routerLink="/create"
              routerLinkActive="active"
              ariaCurrentWhenActive="page"
              >Create Post</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`,
  styles: [
    'nav { background-color: #0E246D !important; color: white; }',
    'nav img { width: 50px; margin-right: 10px; }',
  ],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}