import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'ngx-moment';

import { TagListComponent } from './tag-list/tag-list.component';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MomentModule,
  ],
  declarations: [
    PostListComponent,
    TagListComponent,
  ],
  exports: [
    PostListComponent,
    TagListComponent,
  ],
})
export class BloggingSharedModule { }
