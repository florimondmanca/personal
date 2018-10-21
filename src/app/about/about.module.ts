import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { SocialModule } from 'app/social';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { MeComponent } from './me/me.component';
import { TechComponent } from './tech/tech.component';
import { PatchworkComponent } from './patchwork/patchwork.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabLinkDirective } from './tabs/tab-link.directive';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MarkdownModule.forChild(),
    SocialModule,
  ],
  declarations: [
    AboutComponent,
    MeComponent,
    TechComponent,
    PatchworkComponent,
    TabsComponent,
    TabLinkDirective,
  ],
})
export class AboutModule { }
