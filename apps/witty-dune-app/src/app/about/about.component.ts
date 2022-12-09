import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'witty-dune-about',
  template: `
    <pdf-viewer
      [src]="pdfSrc"
      [render-text]="true"
      [original-size]="false"
      style="height: 600px; margin: 10px 40px 25px 40px"
    ></pdf-viewer>
  `,
  styles: [],
})
export class AboutComponent implements OnInit {
  constructor() {}

  pdfSrc = "assets/pdf/Casus-Witty-Dune.pdf";

  ngOnInit(): void {}
}
