import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { WidgetsModule } from 'app/widgets';
import { SocialModule } from 'app/social';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { MeComponent } from './me/me.component';
import { TechComponent } from './tech/tech.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MarkdownModule.forChild(),
    WidgetsModule,
    SocialModule,
  ],
  declarations: [
    AboutComponent,
    MeComponent,
    TechComponent,
  ],
})
export class AboutModule { }
