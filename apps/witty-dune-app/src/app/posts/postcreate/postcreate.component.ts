import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.ts.service';
import { GameService } from '../../services/game.ts.service';

@Component({
  selector: 'witty-dune-postcreate',
  templateUrl: './postcreate.component.html',
  styles: [
    'button { background-color: #0E246D !important; margin-top: 15px; margin-right: 16px; width: 30%; } ',
    '.post-card { padding: 12px 35px; }',
    '.wrapper { margin-bottom: 25px; margin-right: 10px; margin-top: 10px; margin-left: -15px; }',
    '.bottom-button { margin-top: 15px; }',
    '.bottom-col { padding: 0px }',
  ],
})
export class PostCreateComponent implements OnInit {
  post = {
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

  constructor(private PostService: PostService,
    private GameService: GameService,
    private router: Router) {}

  ngOnInit(): void {
    this.GameService.getAll().subscribe((response) => {
      this.games = response;
    });
  }

  async savePost(): Promise<void> {
    const data = {
      title: this.post.title,
      content: this.post.content,
      likes: 0,
      dislikes: 0,
      publicationdate: new Date(),
      associatedgame: this.selected,
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
    this.router.navigate(['/postlist']);
  }

}
