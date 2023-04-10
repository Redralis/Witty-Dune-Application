import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.ts.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'witty-dune-postlist',
  templateUrl: 'postlist.component.html',
  styleUrls: ['postlist.component.scss'],
})
export class PostlistComponent implements OnInit {
  liked: boolean = false;
  disliked: boolean = false;
  result: any;
  posts: any;
  filter: String = '';
  helper = new JwtHelperService();
  token = localStorage.getItem('jwt') || '';
  userId = this.helper.decodeToken(this.token).sub;

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.getPosts('', '');
  }

  getPosts(filter: String, userId: String) {
    this.service.getAll(filter, userId).subscribe((response) => {
      this.result = response;
      if (localStorage.getItem('game') != '') {
        this.posts = this.result.filter(
          (p: any) => p.associatedgame[0].name == localStorage.getItem('game')
        );
      } else {
        this.posts = this.result;
      }
      this.checkIfSort();
    });
  }

  checkIfSort() {
    if (localStorage.getItem('sortby') != '') {
      switch (localStorage.getItem('sortby')) {
        case 'likesdesc':
          this.posts.sort(function (a: any, b: any) {
            return b.likes - a.likes;
          });
          break;
        case 'likesasc':
          this.posts.sort(function (a: any, b: any) {
            return a.likes - b.likes;
          });
          break;
        case 'dislikesasc':
          this.posts.sort(function (a: any, b: any) {
            return a.dislikes - b.dislikes;
          });
          break;
        case 'dislikesdesc':
          this.posts.sort(function (a: any, b: any) {
            return b.dislikes - a.dislikes;
          });
          break;
      }
    }
  }
}
