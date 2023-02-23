import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.ts.service';

@Component({
  selector: 'witty-dune-gamelist',
  templateUrl: 'gamelist.component.html',
  styleUrls: ['gamelist.component.scss'],
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
