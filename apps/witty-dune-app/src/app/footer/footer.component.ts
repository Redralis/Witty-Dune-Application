import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'witty-dune-footer',
  template: `
    <footer class="border-top footer">
      <div class="container">&copy; 2022 - Witty Dune</div>
    </footer>
  `,
  styles: [
    'footer { background-color: #0E246D !important; color: white; line-height: 60px;bottom: 0; width: 100%; }',
  ],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
