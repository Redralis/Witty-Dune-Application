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
    });
    this.UsersService.profile(this.loggedInUsername).subscribe((response) => {
      this.loggedInUser = response;
      console.log(this.loggedInUser.following);
      this.filteredList = this.loggedInUser.following.filter(
        (f: any) => f._id == this.user._id
      );
      if (this.filteredList.length == 1) this.isFollowing = true;
    });
    this.PostService.getAll().subscribe((response) => {
      this.result = response;
      this.posts = this.result.filter(
        (p: any) => p.postedBy == this.route.snapshot.paramMap.get('username')
      );
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
    console.log(this.loggedInUser);
    if (this.isFollowing) {
      this.isFollowing = false;
      this.loggedInUser.following.splice(
        this.loggedInUser.following.indexOf(this.user._id),
        1
      );
    } else {
      this.isFollowing = true;
      this.loggedInUser.following.push(new Array(this.user._id));
    }
    await this.UsersService.update(this.loggedInUser).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.refresh();
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
