import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.ts.service';
import { FuncsService } from '../services/funcs.services';

@Component({
  selector: 'witty-dune-sidemenu',
  templateUrl: 'sidemenu.component.html',
  styleUrls: ['sidemenu.component.scss'],
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
