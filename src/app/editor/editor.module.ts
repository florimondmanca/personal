import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { CoreModule } from 'app/core';
import { WidgetsModule } from 'app/widgets';

import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatSlideToggleModule,
} from '@angular/material';

import { EditorComponent } from './editor/editor.component';
import { ImageUploadDialogComponent } from './image-upload-dialog/image-upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    WidgetsModule,
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
