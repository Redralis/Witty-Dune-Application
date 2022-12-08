import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PostlistComponent } from './posts/postlist/postlist.component';
import { PostDetailsComponent } from './posts/postdetails/postdetails.component';
import { PostCreateComponent } from './posts/postcreate/postcreate.component';
import { GamelistComponent } from './games/gamelist/gamelist.component';
import { GamedetailsComponent } from './games/gamedetails/gamedetails.component';
import { GamecreateComponent } from './games/gamecreate/gamecreate.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'postlist', pathMatch: 'full' },
  { path: 'postlist', component: PostlistComponent },
  { path: 'postlist/:id', component: PostDetailsComponent },
  { path: 'postcreate', component: PostCreateComponent },
  { path: 'gamelist', component: GamelistComponent },
  { path: 'gamelist/:id', component: GamedetailsComponent },
  { path: 'gamecreate', component: GamecreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
