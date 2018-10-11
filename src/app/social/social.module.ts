import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { DevIconComponent } from './dev-icon/dev-icon.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    FollowButtonComponent,
    DevIconComponent,
  ],
  exports: [
    FollowButtonComponent,
    DevIconComponent,
  ]
})
export class SocialModule { }
