import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.ts.service';
import { GameService } from '../../services/game.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncsService } from '../../services/funcs.services';

@Component({
  selector: 'witty-dune-postdetails',
  templateUrl: 'postdetails.component.html',
  styleUrls: ['postdetails.component.scss']
})
export class PostDetailsComponent implements OnInit {
  isEditing: boolean = false;
  isCreatingComment: boolean = false;
  currentPost: any;
  result: any;
  selected: any;
  isLoggedIn: boolean = false;
  games: any;
  isPostedByLoggedInUser: boolean = false;
  newcomment = {
    postedBy: localStorage.getItem('username'),
    content: '',
    likes: 0,
    dislikes: 0,
    publicationdate: new Date(),
  };
  liked: boolean = false;
  disliked: boolean = false;
  message = '';

  constructor(
    private PostService: PostService,
    private GameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private funcs: FuncsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.message = '';
    if (this.currentPost == null)
      this.getPost(this.route.snapshot.paramMap.get('id'));
    this.GameService.getAll().subscribe((response) => {
      this.games = response;
    });
    if (!this.funcs.isExpired) {
      this.isLoggedIn = true;
    }
  }

  async getPost(id: any): Promise<void> {
    await this.PostService.get(id).subscribe(
      (data) => {
        this.currentPost = data;
        if (localStorage.getItem('username') == this.currentPost.postedBy) this.isPostedByLoggedInUser = true;
        console.log(this.currentPost);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async updatePost(): Promise<void> {
    this.currentPost.associatedgame = this.selected;
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

  checkIfLoggedIn() {
    if (!this.isLoggedIn) this.router.navigate(['/login']);
  }

  refresh(): void {
    window.location.reload();
  }
}