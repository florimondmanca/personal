import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';
import { MarkdownModule } from 'ngx-markdown';

import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
} from '@angular/material';

import { BlogRoutingModule } from './blog-routing.module';

import { CoreModule } from 'app/core';
import { EditorModule } from 'app/editor';
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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MomentModule,
    MarkdownModule.forChild(),
    // Angular Material
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    // Project modules
    CoreModule,
    EditorModule,
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
  ],
  entryComponents: [
    DeleteDialogComponent,
  ],
})
export class BlogModule { }
