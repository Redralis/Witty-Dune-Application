import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.ts.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'witty-dune-postlist',
  template: ` <body>
    <h3>List of posts example</h3>
    <ul class="list-group row">
      <li *ngFor="let post of posts" class="list-group-item">
        <div class="col">
          <h4>{{ post.title }}</h4>
          {{ post.content }}
        </div>
        <a class="badge badge-warning" routerLink="/postlist/{{ post.id }}">
          Edit
        </a>
      </li>
    </ul>
  </body>`,
  styles: [
    'body { margin-left: 40px; margin-right: 40px; margin-bottom: 25px;}',
    'li {margin-top: 10px; border-radius: 3px;}',
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
