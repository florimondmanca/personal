import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabLinkDirective } from './tab-link.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TabsComponent,
    TabLinkDirective,
  ],
  exports: [
    TabsComponent,
    TabLinkDirective,
  ],
})
export class WidgetsModule { }
