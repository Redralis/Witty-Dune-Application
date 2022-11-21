import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.ts.service';

@Component({
  selector: 'witty-dune-postcreate',
  templateUrl: './postcreate.component.html',
  styles: [
    'button { background-color: #0E246D !important; margin-top: 15px; margin-right: 16px; width: 30%; } ', 
  ],
})
export class PostCreateComponent implements OnInit {
  post = {
    title: '',
    content: '',
    likes: 0,
    dislikes: 0,
    publicationdate: new Date(),
  };
  submitted = false;

  constructor(private PostService: PostService) {}

  ngOnInit(): void {}

  async savePost(): Promise<void> {
    const currentdate= new Date();
    const data = {
      title: this.post.title,
      content: this.post.content,
      likes: 0,
      dislikes: 0,
      publicationdate: new Date(),
    };

    await this.PostService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newPost(): void {
    this.submitted = false;
    this.post = {
      title: '',
      content: '',
      likes: 0,
      dislikes: 0,
      publicationdate: new Date(),
    };
  }
}
