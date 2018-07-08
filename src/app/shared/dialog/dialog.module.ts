import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { DialogContainer } from './dialog.container';
import { Dialog } from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DialogComponent,
    DialogContainer,
  ],
  providers: [
    Dialog,
  ],
  exports: [
    DialogContainer,
  ],
  entryComponents: [
    DialogComponent,
  ]
})
export class DialogModule { }
