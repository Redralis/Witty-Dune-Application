import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.ts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'witty-dune-postdetails',
  templateUrl: 'postdetails.component.html',
  styles: [
    'button { background-color: #0E246D !important; margin-top: 15px; margin-right: 16px; width: 30%; }',
    '.post-card { padding: 10px;}',
  ],
})
export class PostDetailsComponent implements OnInit {
  isDisabled: boolean = true;
  currentPost: any;
  message = '';

  constructor(
    private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getPost(this.route.snapshot.paramMap.get('id'));
  }

  getPost(id: any): void {
    this.PostService.get(id).subscribe(
      (data) => {
        this.currentPost = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePost(): void {
    this.PostService.update(this.currentPost.id, this.currentPost).subscribe(
      (response) => {
        console.log(response);
        this.message = 'The post was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost(): void {
    this.PostService.delete(this.currentPost.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/postlist']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
