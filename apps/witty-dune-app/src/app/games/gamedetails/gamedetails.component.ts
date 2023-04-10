import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FuncsService } from '../../services/funcs.services';

@Component({
  selector: 'witty-dune-gamedetails',
  templateUrl: './gamedetails.component.html',
  styleUrls: ['gamedetails.component.scss'],
})
export class GamedetailsComponent implements OnInit {
  isEditing: boolean = false;
  isLoggedIn: boolean = false;
  currentGame: any;
  result: any;
  message = '';

  constructor(
    private GameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private funcs: FuncsService
  ) {}

  ngOnInit(): void {
    if (this.currentGame == null)
      this.getGame(this.route.snapshot.paramMap.get('id'));
    if (!this.funcs.isExpired) {
      this.isLoggedIn = true;
    }
  }

  async getGame(id: any): Promise<void> {
    await this.GameService.get(id).subscribe(
      (data) => {
        this.currentGame = data;
        console.log(this.currentGame);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async updateGame(): Promise<void> {
    await this.GameService.update(
      this.currentGame._id,
      this.currentGame
    ).subscribe(
      (response) => {
        console.log(response);
        this.message = 'The game was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
    this.refresh();
  }

  async deleteGame(): Promise<void> {
    await this.GameService.delete(this.currentGame._id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/gamelist']);
  }

  refresh(): void {
    window.location.reload();
  }

  backClicked() {
    this._location.back();
  }
}
