import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListResolver } from './core';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { posts: PostListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
