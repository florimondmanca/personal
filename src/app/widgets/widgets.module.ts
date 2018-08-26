import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabLinkDirective } from './tabs/tab-link.directive';
import { PatchworkComponent } from './patchwork/patchwork.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabsComponent,
    TabLinkDirective,
    PatchworkComponent,
  ],
  exports: [
    TabsComponent,
    TabLinkDirective,
    PatchworkComponent,
  ],
})
export class WidgetsModule { }
