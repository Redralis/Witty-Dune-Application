import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.ts.service';
import { GameService } from '../../services/game.ts.service';
import { FuncsService } from '../../services/funcs.services';

@Component({
  selector: 'witty-dune-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['postcreate.component.scss'],
})
export class PostCreateComponent implements OnInit {
  post = {
    postedBy: '',
    title: '',
    content: '',
    likes: 0,
    dislikes: 0,
    publicationdate: new Date(),
    associatedgame: {},
  };
  selected: any;
  games: any;
  submitted = false;
  error: boolean = false;
  errormessage: string = '';

  constructor(
    private PostService: PostService,
    private GameService: GameService,
    private router: Router,
    private funcs: FuncsService
  ) {}

  ngOnInit(): void {
    if (this.funcs.isExpired) {
      this.router.navigate(['/login']);
    }
    this.GameService.getAll().subscribe((response) => {
      this.games = response;
    });
  }

  async savePost(): Promise<void> {
    const data = {
      postedBy: localStorage.getItem('username'),
      title: this.post.title,
      content: this.post.content,
      likes: 0,
      dislikes: 0,
      publicationdate: new Date(),
      associatedgame: this.selected,
    };

    await this.PostService.create(data).subscribe(
      (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.setError(true, res.message);
        if (res.message == 'Post created successfully.') {
          this.submitted = true;
          this.router.navigate(['/postlist']);
        }
      },
      (error) => {
        console.log(error)
        this.setError(true, error.error.message);
        if (error.error.message == 'Post created successfully.') {
          this.submitted = true;
          this.router.navigate(['/postlist']);
        }
      }
    );
  }

  setError(error: boolean, message: string) {
    this.error = error;
    this.errormessage = message;
  }

}
