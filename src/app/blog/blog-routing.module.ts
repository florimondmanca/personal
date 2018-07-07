import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListResolver, PostDetailResolver } from './core';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: { posts: PostListResolver },
      },
      {
        path: 'create',
        component: PostCreateComponent,
      },
      {
        path: ':id',
        component: PostDetailComponent,
        resolve: { post: PostDetailResolver },
      },
      {
        path: ':id/edit',
        component: PostEditComponent,
        resolve: { post: PostDetailResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
