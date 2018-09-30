import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core';
import { PostListResolver, TagPostListResolver, PostDetailResolver, DraftListResolver } from './core';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { TagPostListComponent } from './tag-post-list/tag-post-list.component';
import { DraftsComponent } from './drafts/drafts.component';
import { CanDeactivateDirtyPost } from './core';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: { posts: PostListResolver },
        data: { pageId: 'home', title: '' },
      },
      {
        path: 't/:tag',
        component: TagPostListComponent,
        resolve: { posts: TagPostListResolver },
        data: { pageId: 'tag-posts' },
      },
      {
        path: 'create',
        component: PostCreateComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateDirtyPost],
        data: { pageId: 'postCreate', title: 'Create post' },
      },
      {
        path: 'drafts',
        component: DraftsComponent,
        canActivate: [AuthGuard],
        resolve: { posts: DraftListResolver },
        data: { pageId: 'drafts', title: 'Drafts' },
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
        canDeactivate: [CanDeactivateDirtyPost],
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
