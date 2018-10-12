import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core';
import { PostListResolver, TagPostListResolver, PostDetailResolver } from 'app/blogging-core';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TagPostListComponent } from './tag-post-list/tag-post-list.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: { paginator: PostListResolver },
        data: { pageId: 'home' },
      },
      {
        path: 't/:tag',
        component: TagPostListComponent,
        resolve: { paginator: TagPostListResolver },
        data: { pageId: 'tag-posts' },
      },
      {
        path: ':pk',
        component: PostDetailComponent,
        resolve: { post: PostDetailResolver },
        data: { pageId: 'post-detail' },
      },
      {
        path: 'search/:term',
        component: SearchComponent,
        data: { pageId: 'search' },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
