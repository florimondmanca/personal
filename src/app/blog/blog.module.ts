import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';
import { MarkdownModule } from 'ngx-markdown';

import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatChipsModule,
} from '@angular/material';

import { BlogRoutingModule } from './blog-routing.module';

import { BloggingSharedModule } from 'app/blogging-shared';
import { CoreModule } from 'app/core';
import { SocialModule } from 'app/social';
import { WidgetsModule } from 'app/widgets';
import { BlogComponent } from './blog.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostNavComponent } from './post-nav/post-nav.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { TagPostListComponent } from './tag-post-list/tag-post-list.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    MarkdownModule.forChild(),
    // Angular Material
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    // Project modules
    CoreModule,
    SocialModule,
    WidgetsModule,
    BlogRoutingModule,
    BloggingSharedModule,
  ],
  declarations: [
    BlogComponent,
    HomeComponent,
    PostDetailComponent,
    PostNavComponent,
    PostFooterComponent,
    TagPostListComponent,
    SearchComponent,
  ],
})
export class BlogModule { }
