import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import { ErrorComponent } from './error/error.component';
import { ErrorListComponent } from './error-list/error-list.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    ErrorComponent,
    ErrorListComponent,
  ],
  exports: [
    ErrorListComponent,
  ]
})
export class ErrorsModule { }
