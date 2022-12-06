import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.ts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'witty-dune-postdetails',
  templateUrl: 'postdetails.component.html',
  styles: [
    '.wrapper { margin-bottom: 25px; margin-right: 10px; }',
    '.content { margin-top: 10px; margin-left: -15px }',
    '.post-card { padding: 12px 35px; }',
    'button { background-color: #0E246D !important; margin-right: 16px; width: 30%; }',
    '.bottom-button { margin-top: 15px; }',
    '.text-muted { font-size: 14px; }',
  ],
})
export class PostDetailsComponent implements OnInit {
  isEditing: boolean = false;
  isCreatingComment: boolean = false;
  currentPost: any;
  result: any;
  newcomment = {
    content: '',
    likes: 0,
    dislikes: 0,
    publicationdate: new Date(),
  };
  message = '';

  constructor(
    private PostService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.message = '';
    if (this.currentPost == null)
      this.getPost(this.route.snapshot.paramMap.get('id'));
  }

  async getPost(id: any): Promise<void> {
    await this.PostService.get(id).subscribe(
      (data) => {
        this.currentPost = data;
        console.log(this.currentPost);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async updatePost(): Promise<void> {
    await this.PostService.update(
      this.currentPost._id,
      this.currentPost
    ).subscribe(
      (response) => {
        console.log(response);
        this.message = 'The post was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
    this.refresh();
  }

  async deletePost(): Promise<void> {
    await this.PostService.delete(this.currentPost._id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/postlist']);
  }

  async createComment(): Promise<void> {
    this.currentPost.comments.push(new Array(this.newcomment));
    this.updatePost();
    this.refresh();
  }

  async deleteComment(id: number): Promise<void> {
    this.currentPost.comments.splice(id);
    this.updatePost();
  }

  refresh(): void {
    window.location.reload();
  }
}
