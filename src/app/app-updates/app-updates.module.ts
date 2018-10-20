import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { UpdatePromptComponent } from './update-prompt/update-prompt.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule,
    PortalModule,
  ],
  declarations: [UpdatePromptComponent],
  entryComponents: [UpdatePromptComponent],
})
export class AppUpdatesModule { }
