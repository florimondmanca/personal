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

import { CoreModule } from 'app/core';
import { EditorModule } from 'app/editor';
import { SocialModule } from 'app/social';
import { BlogComponent } from './blog.component';
import { PostListComponent } from './post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { DraftsComponent } from './drafts/drafts.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { DeleteDialogComponent } from './post-editor/delete-dialog/delete-dialog.component';
import { PostNavComponent } from './post-nav/post-nav.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
import { TagsFieldComponent } from './tags-field/tags-field.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagPostListComponent } from './tag-post-list/tag-post-list.component';

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
    EditorModule,
    SocialModule,
    BlogRoutingModule,
  ],
  declarations: [
    BlogComponent,
    PostListComponent,
    HomeComponent,
    PostDetailComponent,
    PostCreateComponent,
    PostEditComponent,
    DraftsComponent,
    PostEditorComponent,
    DeleteDialogComponent,
    PostNavComponent,
    PostFooterComponent,
    TagsFieldComponent,
    TagListComponent,
    TagPostListComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
  ],
})
export class BlogModule { }
