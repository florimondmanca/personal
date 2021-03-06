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
import { SocialModule } from 'app/social';
import { BloggingSharedModule } from 'app/blogging-shared';
import { NavbarComponent } from './navbar/navbar.component';
import { NavAdminMenuComponent } from './nav-admin-menu/nav-admin-menu.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SearchModule,
    ThemingModule,
    SocialModule,
    BloggingSharedModule,
  ],
  declarations: [
    NavbarComponent,
    NavAdminMenuComponent,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class NavModule { }
