import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DividerComponent } from './divider/divider.component';
import { RouterOutletHostComponent } from './router-outlet-host/router-outlet-host.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    DividerComponent,
    RouterOutletHostComponent,
  ],
  exports: [
    RouterOutletHostComponent,
  ]
})
export class SharedModule { }
