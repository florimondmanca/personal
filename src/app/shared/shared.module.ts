import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterOutletHostComponent } from './router-outlet-host/router-outlet-host.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    RouterOutletHostComponent,
  ],
  exports: [
    RouterOutletHostComponent,
  ]
})
export class SharedModule { }
