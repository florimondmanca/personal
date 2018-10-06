import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
  MatDialogModule,
  MatButtonModule,
} from '@angular/material';
import { TabsComponent } from './tabs/tabs.component';
import { TabLinkDirective } from './tabs/tab-link.directive';
import { PatchworkComponent } from './patchwork/patchwork.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ImageComponent } from './image/image.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    TabsComponent,
    TabLinkDirective,
    PatchworkComponent,
    SpinnerComponent,
    ImageComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    TabsComponent,
    TabLinkDirective,
    PatchworkComponent,
    SpinnerComponent,
    ImageComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
})
export class WidgetsModule { }
