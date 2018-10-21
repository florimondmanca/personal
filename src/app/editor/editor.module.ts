import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { CoreModule } from 'app/core';
import { ImageModule } from 'app/image';
import { SpinnerComponent } from './spinner/spinner.component';

import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
    ImageModule,
  ],
  declarations: [
    EditorComponent,
    ImageUploadDialogComponent,
    SpinnerComponent,
  ],
  exports: [
    EditorComponent,
  ],
  entryComponents: [
    ImageUploadDialogComponent,
  ],
})
export class EditorModule { }
