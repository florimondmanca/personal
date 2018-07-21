import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material';
import { ClipboardService } from './clipboard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
  ],
  declarations: [],
  providers: [
    ClipboardService,
  ]
})
export class CoreModule { }
