import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core';
import { PostListResolver, PostDetailResolver, DraftListResolver } from './core';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { DraftsComponent } from './drafts/drafts.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: { pageId: 'blog', title: 'CodeSail'},
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: { posts: PostListResolver },
        data: { pageId: 'home' },
      },
      {
        path: 'create',
        component: PostCreateComponent,
        canActivate: [AuthGuard],
        data: { pageId: 'postCreate' },
      },
      {
        path: 'drafts',
        component: DraftsComponent,
        canActivate: [AuthGuard],
        resolve: { posts: DraftListResolver },
        data: { pageId: 'drafts' },
      },
      {
        path: ':pk',
        component: PostDetailComponent,
        resolve: { post: PostDetailResolver },
        data: { pageId: 'postDetail' },
      },
      {
        path: ':pk/edit',
        component: PostEditComponent,
        canActivate: [AuthGuard],
        resolve: { post: PostDetailResolver },
        data: { pageId: 'postEdit' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
