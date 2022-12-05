import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PostlistComponent } from './posts/postlist/postlist.component';
import { PostDetailsComponent } from './posts/postdetails/postdetails.component';
import { PostCreateComponent } from './posts/postcreate/postcreate.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'postlist', pathMatch: 'full' },
  { path: 'postlist', component: PostlistComponent },
  { path: 'postlist/:id', component: PostDetailsComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'about', component: AboutComponent },
];
