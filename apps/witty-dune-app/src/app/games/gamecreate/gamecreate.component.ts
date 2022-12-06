import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'witty-dune-gamecreate',
  templateUrl: './gamecreate.component.html',
  styles: [
    'button { background-color: #0E246D !important; margin-top: 15px; margin-right: 16px; width: 30%; } ',
    '.post-card { padding: 12px 35px; }',
    '.wrapper { margin-bottom: 25px; margin-right: 10px; margin-top: 10px; margin-left: -15px; }',
    '.bottom-button { margin-top: 15px; }',
    '.bottom-col { padding: 0px }',
  ],
})
export class GamecreateComponent implements OnInit {
  game = {
    name: '',
    description: '',
  };
  submitted = false;

  constructor(private GameService: GameService,
    private router: Router) {}

  ngOnInit(): void {}

  async saveGame(): Promise<void> {
    const data = {
      name: this.game.name,
      description: this.game.description,
    };

    await this.GameService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['/gamelist']);
  }

  newGame(): void {
    this.submitted = false;
    this.game = {
      name: '',
      description: '',
    };
  }
}
