import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { PostlistComponent } from './posts/postlist/postlist.component';
import { PostCreateComponent } from './posts/postcreate/postcreate.component';
import { PostDetailsComponent } from './posts/postdetails/postdetails.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GamelistComponent } from './games/gamelist/gamelist.component';
import { GamedetailsComponent } from './games/gamedetails/gamedetails.component';
import { GamecreateComponent } from './games/gamecreate/gamecreate.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    PostlistComponent,
    PostCreateComponent,
    PostDetailsComponent,
    SidemenuComponent,
    GamelistComponent,
    GamedetailsComponent,
    GamecreateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    FormsModule,
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
