import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
} from '@angular/material';
import { TabsComponent } from './tabs/tabs.component';
import { TabLinkDirective } from './tabs/tab-link.directive';
import { PatchworkComponent } from './patchwork/patchwork.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    TabsComponent,
    TabLinkDirective,
    PatchworkComponent,
    SpinnerComponent,
  ],
  exports: [
    TabsComponent,
    TabLinkDirective,
    PatchworkComponent,
    SpinnerComponent,
  ],
})
export class WidgetsModule { }
