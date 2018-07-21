import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { FileDropModule } from 'ngx-file-drop';

import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
} from '@angular/material';

import { EditorComponent } from './editor/editor.component';
import { ImageUploadDialogComponent } from './image-upload-dialog/image-upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    FileDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  declarations: [
    EditorComponent,
    ImageUploadDialogComponent,
  ],
  exports: [
    EditorComponent,
  ],
  entryComponents: [
    ImageUploadDialogComponent,
  ],
})
export class EditorModule { }
