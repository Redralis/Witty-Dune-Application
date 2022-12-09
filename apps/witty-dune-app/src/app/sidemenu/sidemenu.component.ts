import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.ts.service';
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
          <h2>Filter and sort!</h2>
          <p class="card-text">
            The posts can be filtered and sorted in a number of ways. Find a
            filter that applies to you and select it!
          </p>
          <!-- Selector for associated game -->
          <label for="associatedgame">Filter by game:</label>
          <p>
            <select [(ngModel)]="selected">
              <option *ngFor="let game of games" [ngValue]="game">
                {{ game.name }}
              </option>
            </select>
          </p>
          <label for="sort">Sort by:</label>
          <p>
            <select [(ngModel)]="selectedsort">
              <option value="likesdesc">Most likes</option>
              <option value="likesasc">Least likes</option>
              <option value="dislikesdesc">Most dislikes</option>
              <option value="dislikesasc">Least dislikes</option>
            </select>
          </p>
          <button class="btn btn-primary" (click)="filter(); sort();">Filter</button>
          <button class="btn btn-primary" (click)="clearFilters()">
            Clear filters
          </button>
          <!-- End of selector for associated game -->
        </div>
      </div>
    </div>
  `,
  styles: [
    '.wrapper { border-radius: 3px; margin-top: 10px;}',
    'button { background-color: #0E246D !important; width: 100%; margin-bottom: 5px; } ',
    '.filters-card { margin-top: 20px; margin-bottom: 25px; } ',
    'select { width: 100%; }',
  ],
})
export class SidemenuComponent implements OnInit {
  selected: any;
  selectedsort: any;
  games: any;

  constructor(
    private funcs: FuncsService,
    private router: Router,
    private GameService: GameService
  ) {}

  ngOnInit(): void {
    this.GameService.getAll().subscribe((response) => {
      this.games = response;
    });
  }

  checkIfLoggedIn() {
    if (this.funcs.isExpired) {
      this.router.navigate(['/login']);
    }
  }

  filter() {
    if (this.selected != undefined) {
      localStorage.setItem('game', this.selected.name);
    }
  }

  sort() {
    localStorage.setItem('sortby', this.selectedsort);
    this.refresh();
  }

  clearFilters() {
    localStorage.setItem('game', '');
    localStorage.setItem('sortby', '');
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
