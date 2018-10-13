import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';
import { SearchModule } from 'app/search';
import { ThemingModule } from 'app/theming';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SearchModule,
    ThemingModule,
  ],
  declarations: [NavbarComponent, AdminMenuComponent],
  exports: [NavbarComponent],
})
export class NavModule { }
