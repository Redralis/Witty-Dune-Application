import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncsService } from '../services/funcs.services';

@Component({
  selector: 'witty-dune-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isExpired = false;
  username = localStorage.getItem('username');
  profilepage = '/auth/' + this.username;

  constructor(private router: Router, private funcs: FuncsService) {}

  ngOnInit(): void {
    this.isExpired = this.funcs.isLoggedIn();
  }

  navigate(): void {
    this.router.navigate(['/postlist']).then(() => {
      this.router.navigate([this.profilepage]);
    });
  }

  logout(): void {
    localStorage.setItem('jwt', '');
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}
