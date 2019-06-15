import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PostListResolver, TagPostListResolver, PostDetailResolver, PostSearchResolver } from 'app/blogging-core';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './blog/home/home.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { TagPostListComponent } from './blog/tag-post-list/tag-post-list.component';
import { SearchComponent } from './blog/search/search.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: MainComponent,
    data: { pageId: 'main' },
    children: [
      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
        data: { pageId: 'privacy' },
      },
      {
        path: 'a',
        loadChildren: './admin/admin.module#AdminModule',
      },
      // Should be at the bottom because '' matches everything
      // NOTE: eager-loaded so that main route is not lazy-loaded,
      // which adds significant extra network round trips and script evaluations.
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
            resolve: { paginator: PostSearchResolver },
            data: { pageId: 'search' },
          }
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  // initialNavigation fixes page flickering when using SSR
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
