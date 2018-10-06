import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatChipsModule,
} from '@angular/material';

import { BloggingSharedModule } from 'app/blogging-shared';
import { EditorModule } from 'app/editor';
import { WidgetsModule } from 'app/widgets';

import { AdminRoutingModule } from './admin-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { DraftsComponent } from './drafts/drafts.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { TagsFieldComponent } from './tags-field/tags-field.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    // App
    EditorModule,
    WidgetsModule,
    BloggingSharedModule,
    AdminRoutingModule,
  ],
  declarations: [
    PostCreateComponent,
    PostEditComponent,
    DraftsComponent,
    PostEditorComponent,
    TagsFieldComponent,
  ],
})
export class AdminModule { }
