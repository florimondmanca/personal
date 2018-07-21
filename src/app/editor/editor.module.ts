import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import {
  MatInputModule,
  MatFormFieldModule,
} from '@angular/material';

import { EditorComponent } from './editor/editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    EditorComponent,
  ],
  exports: [
    EditorComponent,
  ],
})
export class EditorModule { }
