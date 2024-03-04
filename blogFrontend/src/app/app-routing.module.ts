import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogsComponent} from "./components/blogs/blogs.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {CommunityComponent} from "./components/community/community.component";
import {BlogPostComponent} from "./components/blogs/blog-post/blog-post.component";
import {ConversationComponent} from "./components/conversation/conversation.component";
import {MessagesComponent} from "./components/conversation/messages/messages.component";
import {CanActivate} from "./security/auth.guard";
import {ProfileComponent} from "./components/profile/profile.component";


const routes: Routes = [
  {path: '', component: BlogsComponent},
  //{path: '', redirectTo: "home", pathMatch: 'full'},
  {path: 'blogs', component: BlogsComponent},
  {path: 'blogs/:id', component: BlogPostComponent},
  {path: 'conversations', component: ConversationComponent, canActivate: [CanActivate]},
  {path: 'profile', component: ProfileComponent},
  {path: 'conversations/:id', component: MessagesComponent},
  {path: 'community', component: CommunityComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
