import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
} from '@angular/material';
import { UpdatePromptComponent } from './update-prompt/update-prompt.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [UpdatePromptComponent],
  entryComponents: [UpdatePromptComponent],
})
export class AppUpdatesModule { }
