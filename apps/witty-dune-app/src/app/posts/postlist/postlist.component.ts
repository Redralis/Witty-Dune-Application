import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.ts.service';

@Component({
  selector: 'witty-dune-postlist',
  template: ` <div class="wrapper">
    <ul class="list-group row">
      <li *ngFor="let post of posts" class="list-group-item">
        <div class="row">
          <div class="col-1 like-dislike-col">
            <div *ngIf="liked" class="icon">
              <img class="text-center" src="assets/images/upvote-filled.png" />
            </div>
            <div *ngIf="!liked" class="icon">
              <img src="assets/images/upvote.png" />
            </div>
            <p class="karma text-center">{{ post.likes - post.dislikes }}</p>
            <div *ngIf="liked" class="icon">
              <img src="assets/images/downvote-filled.png" />
            </div>
            <div *ngIf="!liked" class="icon">
              <img src="assets/images/downvote.png" />
            </div>
          </div>
          <div class="col-11 postcontent">
            <h4>
              {{ post.title }}
              <img
                class="float-right"
                *ngIf="post.associatedgame[0] != null"
                [src]="post.associatedgame[0].logo"
                routerLink="/gamelist/{{ post.associatedgame[0]._id }}"
              />
            </h4>
            <p class="text-muted">
              Posted on {{ post.publicationdate.substring(0, 10) }} by
              {{ post.postedBy }}
            </p>
            <p>{{ post.content.substring(0, 40) }}...</p>
            <p class="text-muted">
              {{ post.likes }} likes - {{ post.dislikes }} dislikes
            </p>
            <button
              class="btn btn-primary"
              routerLink="/postlist/{{ post._id }}"
            >
              Details
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>`,
  styles: [
    '.wrapper { margin-right: 24px; margin-bottom: 25px;}',
    'li { margin-top: 10px; border-radius: 3px; }',
    'button { background-color: #0E246D !important; width: 15%; }',
    '.text-muted { font-size: 14px; }',
    'img { height: 80px; width: 80px; }',
    '.list-group-item { padding: 12px 35px }',
    '.icon img { width: 100%; height: 100%; justify-content: center; cursor: pointer; }',
    '.postcontent { padding-left: 5px; }',
    '.karma { margin: auto; }',
    '.like-dislike-col { padding-left: 5px; }',
  ],
})
export class PostlistComponent implements OnInit {
  result: any;
  posts: any;
  liked: boolean = false;
  disliked: boolean = false;

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((response) => {
      this.result = response;
      if (localStorage.getItem('game') != '') {
        this.posts = this.result.filter(
          (p: any) => p.associatedgame[0].name == localStorage.getItem('game')
        );
      } else {
        this.posts = this.result;
      }
    });
  }
}
