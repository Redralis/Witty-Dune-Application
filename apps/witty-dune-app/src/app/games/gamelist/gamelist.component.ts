import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.ts.service';

@Component({
  selector: 'witty-dune-gamelist',
  template: ` <div class="wrapper">
    <ul class="list-group row">
      <li *ngFor="let game of games" class="list-group-item">
        <div class="row">
          <div class="col-md-1">
            <img [src]="game.logo" />
          </div>
          <div class="col-md-6 game">
            <h4>{{ game.name }}</h4>
            <p>{{ game.description.substring(0, 42) }}...</p>
          </div>
          <div class="col">
            <button
              class="btn btn-primary float-right"
              routerLink="/gamelist/{{ game._id }}"
            >
              Details
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>`,
  styles: [
    '.wrapper { margin-right: 24px; margin-bottom: 25px;}',
    'li { margin-top: 10px; border-radius: 3px; }',
    'button { background-color: #0E246D !important; width: 50%; right: 0px; margin-top: 22px; }',
    'img { height: 80px; width: 80px; }',
    '.game { margin-left: 25px; }',
    '.game p { margin-bottom: 0px; }',
  ],
})
export class GamelistComponent implements OnInit {
  games: any;

  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((response) => {
      this.games = response;
    });
  }
}
