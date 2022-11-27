import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.ts.service';
import { ReplyService } from '../services/reply.ts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'witty-dune-postdetails',
  templateUrl: 'postdetails.component.html',
  styles: [
    '.wrapper { margin-bottom: 25px; margin-right: 24px;}',
    '.content { margin-top: 10px; }',
    '.post-card { padding: 12px 20px; }',
    'button { background-color: #0E246D !important; margin-top: 15px; margin-right: 16px; width: 30%; }',
    '.text-muted { font-size: 14px; }',
  ],
})
export class PostDetailsComponent implements OnInit {
  isDisabled: boolean = true;
  isReplying: boolean = true;
  isEditingReply: boolean = true;
  currentPost: any;
  replies: any;
  result: any;
  reply = {
    postid: 0,
    content: '',
    likes: 0,
    dislikes: 0,
    publicationdate: new Date(),
  };
  message = '';

  constructor(
    private PostService: PostService,
    private ReplyService: ReplyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //Getting post in constructor AND ngOnInit to make sure it is always retrieved before it is used.
    if (this.currentPost == null) this.getPost(this.route.snapshot.paramMap.get('id'));
  }

  async ngOnInit(): Promise<void> {
    this.message = '';
    if (this.currentPost == null) this.getPost(this.route.snapshot.paramMap.get('id'));
    this.ReplyService.getAll().subscribe((response) => {
      this.result = response;
      this.replies = this.result.filter(
        (r: any) => r.postid == this.currentPost._id
      );
    });
  }

  async getPost(id: any): Promise<void> {
    await this.PostService.get(id).subscribe(
      (data) => {
        this.currentPost = data;
        console.log(data);
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
  }

  async deletePost(): Promise<void> {
    await this.PostService.delete(this.currentPost._id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/postlist']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async createReply(): Promise<void> {
    const data = {
      postid: this.currentPost._id,
      content: this.reply.content,
      likes: 0,
      dislikes: 0,
      publicationdate: new Date(),
    };

    await this.ReplyService.create(data).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async updateReply(id: string, reply: any): Promise<void> {
    await this.ReplyService.update(id, reply).subscribe(
      (response) => {
        console.log(response);
        this.message = 'The post was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteReply(id: string): Promise<void> {
    await this.ReplyService.delete(id).subscribe(
      (response) => {
        console.log(response);
        this.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refresh(): void {
    window.location.reload();
  }
}
