import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListResolver, PostDetailResolver } from './core';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { posts: PostListResolver },
  },
  {
    path: ':id',
    component: PostDetailComponent,
    resolve: { post: PostDetailResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
