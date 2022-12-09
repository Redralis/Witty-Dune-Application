import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncsService } from '../services/funcs.services';

@Component({
  selector: 'witty-dune-sidemenu',
  template: `
    <div class="wrapper">
      <div class="card row">
        <div class="card-body col">
          <h2>Make a post!</h2>
          <p class="card-text">
            To create a new post, press the 'create post' button.
          </p>
          <button
            class="btn btn-primary"
            (click)="checkIfLoggedIn()"
            routerLink="/postcreate"
            routerLinkActive="active"
          >
            Create post
          </button>
        </div>
      </div>
      <div class="card row filters-card">
        <div class="card-body col">
          <h2>Submit a game!</h2>
          <p class="card-text">
            To submit a new game, press the 'submit game' button.
          </p>
          <button
            class="btn btn-primary"
            (click)="checkIfLoggedIn()"
            routerLink="/gamecreate"
            routerLinkActive="active"
          >
            Submit game
          </button>
        </div>
      </div>
      <div class="card row filters-card">
        <div class="card-body col">
          <h2>Filters</h2>
          <p class="card-text">
            The posts can be filtered in a number of ways. Find a filter that
            applies to you and select it!
          </p>
          <button class="btn btn-primary">Filter</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    '.wrapper { border-radius: 3px; margin-top: 10px;}',
    'button { background-color: #0E246D !important; width: 100%; } ',
    '.filters-card { margin-top: 20px; margin-bottom: 25px; } ',
  ],
})
export class SidemenuComponent implements OnInit {
  constructor(private funcs: FuncsService, private router: Router) {}

  ngOnInit(): void {}

  checkIfLoggedIn() {
    if (this.funcs.isExpired) {
      this.router.navigate(['/login']);
    }
  }
}
