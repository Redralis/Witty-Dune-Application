import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.ts.service';

@Component({
  selector: 'witty-dune-postlist',
  template: ` <div class="wrapper">
    <ul class="list-group row">
      <li *ngFor="let post of posts" class="list-group-item">
        <div class="col">
          <h4>{{ post.title }}</h4>
          {{ post.content }}<br>
          <button class="btn btn-primary" routerLink="/postlist/{{ post.id }}">
            Details
          </button>
        </div>
      </li>
    </ul>
</div>`,
  styles: [
    '.wrapper { margin-right: 24px; margin-bottom: 25px;}',
    'li { margin-top: 10px; border-radius: 3px; }',
    'button { background-color: #0E246D !important; margin-top: 15px; width: 15%; }',
  ],
})
export class PostlistComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((response) => {
      this.posts = response;
    });
  }
}
