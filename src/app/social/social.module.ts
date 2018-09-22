import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FollowButtonComponent } from './follow-button/follow-button.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    FollowButtonComponent,
  ],
  exports: [
    FollowButtonComponent,
  ]
})
export class SocialModule { }
