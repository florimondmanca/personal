import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { ClipboardService } from './clipboard.service';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  declarations: [],
  providers: [
    ClipboardService,
  ]
})
export class CoreModule { }
