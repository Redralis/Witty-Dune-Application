import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.ts.service';

@Component({
  selector: 'witty-dune-postcreate',
  templateUrl: './postcreate.component.html',
  styles: [
  ],
})
export class PostCreateComponent implements OnInit {
  post = {
    title: '',
    content: '',
    likes: 0,
    dislikes: 0,
    publicationdate: Date,
  };
  submitted = false;

  constructor(private PostService: PostService) {}

  ngOnInit(): void {}

  savePost(): void {
    const data = {
      title: this.post.title,
      content: this.post.content,
      likes: 0,
      dislikes: 0,
      publicationdate: Date,
    };

    this.PostService.create(data).subscribe(
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
      publicationdate: Date,
    };
  }
}
