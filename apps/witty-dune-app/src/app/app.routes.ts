import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PostlistComponent } from './posts/postlist/postlist.component';
import { PostDetailsComponent } from './posts/postdetails/postdetails.component';
import { GamelistComponent } from './games/gamelist/gamelist.component';
import { GamedetailsComponent } from './games/gamedetails/gamedetails.component';
import { PostCreateComponent } from './posts/postcreate/postcreate.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'postlist', pathMatch: 'full' },
  { path: 'postlist', component: PostlistComponent },
  { path: 'postlist/:id', component: PostDetailsComponent },
  { path: 'gamelist', component: GamelistComponent },
  { path: 'gamelist/:id', component: GamedetailsComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'about', component: AboutComponent },
];
