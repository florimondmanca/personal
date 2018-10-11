import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule,
} from '@angular/material';

import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [ThemeSwitchComponent],
  exports: [ThemeSwitchComponent],
})
export class ThemingModule { }
