import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [NavbarComponent, AdminMenuComponent],
  exports: [NavbarComponent],
})
export class NavModule { }
