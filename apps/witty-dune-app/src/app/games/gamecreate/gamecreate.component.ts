import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.ts.service';
import { Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.services';

@Component({
  selector: 'witty-dune-gamecreate',
  templateUrl: './gamecreate.component.html',
  styleUrls: ['gamecreate.component.scss'],
})
export class GamecreateComponent implements OnInit {
  game = {
    name: '',
    description: '',
    releasedate: new Date(),
    logo: '',
  };
  submitted = false;

  constructor(
    private GameService: GameService,
    private router: Router,
    private funcs: FuncsService
  ) {}

  ngOnInit(): void {
    if (this.funcs.isExpired) {
      this.router.navigate(['/login']);
    }
  }

  async saveGame(): Promise<void> {
    const data = {
      name: this.game.name,
      description: this.game.description,
      releasedate: this.game.releasedate,
      logo: this.game.logo,
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
}
