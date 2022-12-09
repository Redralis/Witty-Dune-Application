import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.ts.service';
import { PostService } from '../services/post.ts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncsService } from '../services/funcs.services';

@Component({
  selector: 'witty-dune-profile',
  template: `
    <div class="wrapper">
      <div *ngIf="user" class="edit-form">
        <div class="content">
          <div class="card user-card">
            <div class="row">
              <!-- Profile picture -->
              <div class="col-2">
                <img
                  class="profilepicture"
                  alt="User's profile picture"
                  [src]="user.profilepic"
                />
              </div>
              <!-- End of profile picture -->
              <div class="col-6">
                <!-- Username -->
                <p *ngIf="isEditing">
                  <label for="username">Username:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    [(ngModel)]="user.username"
                    name="username"
                  />
                </p>
                <h4 *ngIf="!isEditing">{{ user.username }}</h4>
                <!-- End of username -->
                <!-- First/last name and date of birth -->
                <p *ngIf="isEditing">
                  <label for="firstname">First name:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    [(ngModel)]="user.firstname"
                    name="firstname"
                  />
                  <label for="lastname">Last name:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    [(ngModel)]="user.lastname"
                    name="lastname"
                  />
                  <label for="dateofbirth">Date of birth:</label>
                  <input
                    class="form-control"
                    type="date"
                    id="dateofbirth"
                    required
                    [(ngModel)]="user.dateofbirth"
                    name="dateofbirth"
                  />
                </p>
                <p class="text-muted" *ngIf="!isEditing">
                  Real name: {{ user.firstname }} {{ user.lastname }}, born on
                  {{ user.dateofbirth.substring(0, 10) }}
                </p>
                <!-- End of first/last name and date of birth -->
                <!-- Email -->
                <p *ngIf="isEditing">
                  <label for="email">Email address:</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    [(ngModel)]="user.email"
                    name="email"
                  />
                </p>
                <p *ngIf="!isEditing">Email: {{ user.email }}</p>
                <!-- End of email -->
                <!-- Country -->
                <p *ngIf="isEditing">
                  <label for="country">Country:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="country"
                    [(ngModel)]="user.country"
                    name="country"
                  />
                </p>
                <p *ngIf="!isEditing">Country: {{ user.country }}</p>
                <!-- End of country -->
                <!-- Profile picture -->
                <p *ngIf="isEditing">
                  <label for="profilepic">Profile picture URL:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="profilepic"
                    [(ngModel)]="user.profilepic"
                    name="profilepic"
                  />
                </p>
                <!-- End of profile picture -->
              </div>
              <!-- Following -->
              <div *ngIf="!isEditing" class="col-4">
                <h4>Following:</h4>
                <ul
                  class="list-group-flush row-12 col-12"
                  style="margin-top: 10px; padding-left: 0px"
                >
                  <li
                    *ngFor="let followed of user.following"
                    class="list-group-item followingname"
                  >
                    <div class="col">
                      <!-- Followed username -->
                      {{ followed.username }}
                      <!-- End of followed username -->
                    </div>
                  </li>
                </ul>
              </div>
              <!-- End of following -->
              <!-- Posts made by user -->
              <div class="col-12">
                <ul class="list-group row">
                  <li *ngFor="let post of posts" class="list-group-item">
                    <div class="row">
                      <div class="col-1 like-dislike-col">
                        <div *ngIf="liked" class="icon">
                          <img
                            class="text-center"
                            src="assets/images/upvote-filled.png"
                          />
                        </div>
                        <div *ngIf="!liked" class="icon">
                          <img src="assets/images/upvote.png" />
                        </div>
                        <p class="karma text-center">
                          {{ post.likes - post.dislikes }}
                        </p>
                        <div *ngIf="liked" class="icon">
                          <img src="assets/images/downvote-filled.png" />
                        </div>
                        <div *ngIf="!liked" class="icon">
                          <img src="assets/images/downvote.png" />
                        </div>
                      </div>
                      <div class="col-11 postcontent">
                        <h4>
                          {{ post.title }}
                          <img
                            class="float-right gamelogo"
                            *ngIf="post.associatedgame[0] != null"
                            [src]="post.associatedgame[0].logo"
                            routerLink="/gamelist/{{
                              post.associatedgame[0]._id
                            }}"
                          />
                        </h4>
                        <p class="text-muted">
                          Posted on
                          {{ post.publicationdate.substring(0, 10) }} by
                          {{ post.postedBy }}
                        </p>
                        <p>{{ post.content.substring(0, 40) }}...</p>
                        <p class="text-muted">
                          {{ post.likes }} likes - {{ post.dislikes }} dislikes
                        </p>
                        <button
                          class="btn btn-primary"
                          routerLink="/postlist/{{ post._id }}"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- End of posts made by user -->
            </div>
          </div>
          <!-- Buttons to start & cancel edit mode -->
          <button
            class="btn btn-primary bottom-button"
            *ngIf="!isEditing && isCurrentUser"
            (click)="isEditing = true"
          >
            Edit
          </button>

          <!-- Follow and unfollow buttons -->
          <button
            class="btn btn-primary bottom-button"
            *ngIf="!isEditing && !isCurrentUser && !isFollowing"
            (click)="follow()"
          >
            Follow
          </button>
          <button
            class="btn btn-primary bottom-button"
            *ngIf="!isEditing && !isCurrentUser && isFollowing"
            (click)="follow()"
          >
            Unfollow
          </button>
          <!-- End of follow and unfollow buttons -->

          <button
            *ngIf="isEditing"
            class="btn btn-primary bottom-button"
            (click)="isEditing = false"
          >
            Cancel
          </button>
          <!-- End of buttons to start & cancel edit mode -->

          <!-- Button to update post -->
          <button
            *ngIf="isEditing"
            type="submit"
            class="btn btn-primary bottom-button"
            (click)="updateUser()"
          >
            Update
          </button>
          <!-- End of button to update post -->

          <!-- Button to delete post -->
          <button
            *ngIf="isEditing"
            class="btn btn-primary mr-2 bottom-button"
            (click)="deleteUser()"
          >
            Delete
          </button>
          <!-- End of button to delete post -->
        </div>
      </div>
      <div *ngIf="!user" class="edit-form">
        Couldn't find the current user...
      </div>
    </div>
  `,
  styles: [
    '.wrapper { margin-bottom: 25px; margin-right: 10px; }',
    '.content { margin-top: 10px; margin-left: -15px }',
    '.user-card { padding: 12px 35px; }',
    'button { background-color: #0E246D !important; margin-right: 16px; width: 30%; }',
    '.bottom-button { margin-top: 15px; }',
    '.text-muted { font-size: 14px; }',
    'label { font-weight: bold; }',
    '.icon img { width: 100%; height: 100%; justify-content: center; cursor: pointer; }',
    '.karma { margin-bottom: 0px; }',
    '.gamelogo { width: 10%; height: 10%;}',
    '.profilepicture { width: 100px; height: 100px;}',
    '.followingname { padding-left: 0px; padding-right: 0px;}',
  ],
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

  refresh(): void {
    window.location.reload();
  }
}
