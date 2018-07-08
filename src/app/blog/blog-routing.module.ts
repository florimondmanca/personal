import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core';
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
        canActivate: [AuthGuard],
      },
      {
        path: ':pk',
        component: PostDetailComponent,
        resolve: { post: PostDetailResolver },
      },
      {
        path: ':pk/edit',
        component: PostEditComponent,
        canActivate: [AuthGuard],
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
