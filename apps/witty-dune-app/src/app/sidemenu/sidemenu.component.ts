import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'witty-dune-sidemenu',
  template: `
    <body>
      <div class="card row">
        <div class="card-body col">
          <h2>General posts</h2>
          <p class="card-text">
            To create a new post, press the 'create post' button.
          </p>
          <button class="btn btn-primary" routerLink="/create" routerLinkActive="active">Create post</button>
        </div>
      </div>
      <div class="card row filters-card">
        <div class="card-body col">
          <h2>Filters</h2>
          <p class="card-text">
            The posts can be filtered in a number of ways. Find a filter that applies to you and select it!
          </p>
          <button class="btn btn-primary">Filter</button>
        </div>
      </div>  
    </body>
  `,
  styles: [
    'body { border-radius: 3px; margin-top: 10px; }',
    'button { background-color: #0E246D !important; width: 100%; } ',
    '.filters-card { margin-top: 20px; } ',
  ],
})
export class SidemenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
