import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'witty-dune-about',
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.scss'],
})
export class AboutComponent implements OnInit {
  pdfSrc = 'assets/pdf/Casus-Witty-Dune.pdf';

  constructor() {}

  ngOnInit(): void {}
}
