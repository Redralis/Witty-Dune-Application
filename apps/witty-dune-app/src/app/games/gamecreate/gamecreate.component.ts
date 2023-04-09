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
  error: boolean = false;
  errormessage: string = '';

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

    this.GameService.create(data).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.setError(true, res.message);
        if (res.message == 'Game created successfully.') {
          this.submitted = true;
          this.router.navigate(['/gamelist']);
        }
      },
      (error) => {
        this.setError(true, error.error.text);
        if (error.error.text == 'Game created successfully.') {
          this.submitted = true;
          this.router.navigate(['/gamelist']);
        }
      }
    );
  }

  setError(error: boolean, message: string) {
    this.error = error;
    this.errormessage = message;
  }
}
