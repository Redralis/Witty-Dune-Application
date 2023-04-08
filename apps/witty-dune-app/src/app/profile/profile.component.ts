import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.ts.service';
import { PostService } from '../services/post.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncsService } from '../services/funcs.services';

@Component({
  selector: 'witty-dune-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isCurrentUser: boolean = false;
  username: any = {
    username: this.route.snapshot.paramMap.get('username'),
  };
  loggedInUsername: any = {
    username: localStorage.getItem('username'),
  };
  user: any;
  isEditing: boolean = false;
  result: any;
  loggedInUser: any;
  posts: any;
  filteredList: any;
  isFollowing: boolean = false;
  liked: boolean = false;
  disliked: boolean = false;

  constructor(
    private UsersService: UserService,
    private PostService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private funcs: FuncsService
  ) {}

  ngOnInit(): void {
    if (this.funcs.isExpired) {
      this.router.navigate(['/login']);
    }
    if (
      localStorage.getItem('username') ==
      this.route.snapshot.paramMap.get('username')
    )
      this.isCurrentUser = true;
    this.UsersService.profile(this.username).subscribe((response) => {
      this.user = response;
      this.PostService.getAll('', this.user._id).subscribe((response) => {
        this.result = response;
        this.posts = this.result;
      });
    });
    this.UsersService.profile(this.loggedInUsername).subscribe((response) => {
      this.loggedInUser = response;
      this.filteredList = this.loggedInUser.following.filter(
        (f: any) => f == this.user.username
      );
      if (this.filteredList.length > 0) this.isFollowing = true;
    });
  }

  async updateUser(): Promise<void> {
    await this.UsersService.update(this.user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.refresh();
  }

  async deleteUser(): Promise<void> {
    localStorage.setItem('userId', this.user._id);
    await this.UsersService.delete(this.user._id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/login']);
  }

  async follow(): Promise<void> {
    await this.UsersService.follow(this.user.username).subscribe(
      (response) => {
        console.log(response);
        this.isFollowing = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async unfollow(): Promise<void> {
    await this.UsersService.unfollow(this.user.username).subscribe(
      (response) => {
        console.log(response);
        this.isFollowing = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigate(username: string): void {
    this.router.navigate(['/postlist']).then(() => {
      this.router.navigate(['/user/' + username]);
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
