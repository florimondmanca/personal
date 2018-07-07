import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';

import { BlogRoutingModule } from './blog-routing.module';
import { PostListComponent } from './post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    BlogRoutingModule,
  ],
  declarations: [
    PostListComponent,
    HomeComponent,
    PostDetailComponent,
  ]
})
export class BlogModule { }
