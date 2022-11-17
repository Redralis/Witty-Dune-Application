import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PostlistComponent } from './postlist/postlist.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'postlist', pathMatch: 'full' },
  { path: 'postlist', component: PostlistComponent },
  { path: 'about', component: AboutComponent },
];
