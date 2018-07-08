import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MomentModule } from 'ngx-moment';
import { MarkdownModule } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import {
  MatButtonModule,
} from '@angular/material';

import { BlogRoutingModule } from './blog-routing.module';

import { CoreModule } from 'app/core';
import { DialogModule } from 'app/shared';
import { BlogComponent } from './blog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostListComponent } from './post-list/post-list.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditorComponent } from './editor/editor.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MomentModule,
    MarkdownModule.forChild(),
    FontAwesomeModule,
    // Angular Material
    MatButtonModule,
    // Project modules
    CoreModule,
    DialogModule,
    BlogRoutingModule,
  ],
  declarations: [
    BlogComponent,
    NavbarComponent,
    PostListComponent,
    HomeComponent,
    PostDetailComponent,
    EditorComponent,
    PostCreateComponent,
    PostEditComponent,
  ]
})
export class BlogModule { }
