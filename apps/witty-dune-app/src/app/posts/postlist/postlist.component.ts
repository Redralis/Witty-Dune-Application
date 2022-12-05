import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.ts.service';

@Component({
  selector: 'witty-dune-postlist',
  template: ` <div class="wrapper">
    <ul class="list-group row">
      <li *ngFor="let post of posts" class="list-group-item">
        <div class="col">
          <h4>{{ post.title }}</h4>
          <p class="text-muted">Posted on {{ post.publicationdate }}</p>
          <p>{{ post.content.substring(0, 40) }}...</p>
          <p class="text-muted">
            {{ post.likes }} likes - {{ post.dislikes }} dislikes
          </p>
          <button class="btn btn-primary" routerLink="/postlist/{{ post._id }}">
            Details
          </button>
        </div>
      </li>
    </ul>
  </div>`,
  styles: [
    '.wrapper { margin-right: 24px; margin-bottom: 25px;}',
    'li { margin-top: 10px; border-radius: 3px; }',
    'button { background-color: #0E246D !important; width: 15%; }',
    '.text-muted { font-size: 14px; }',
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
