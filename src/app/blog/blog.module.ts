import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatChipsModule,
  MatSidenavModule,
} from '@angular/material';

import { BloggingSharedModule } from 'app/blogging-shared';
import { CoreModule } from 'app/core';
import { SocialModule } from 'app/social';
import { ImageModule } from 'app/image';
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
    MarkdownModule.forChild(),
    RouterModule,
    // Angular Material
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatSidenavModule,
    // Project modules
    CoreModule,
    SocialModule,
    ImageModule,
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
