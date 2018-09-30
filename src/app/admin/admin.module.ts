import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { DraftsComponent } from './drafts/drafts.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { DeleteDialogComponent } from './post-editor/delete-dialog/delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    PostCreateComponent,
    PostEditComponent,
    DraftsComponent,
    PostEditorComponent,
    DeleteDialogComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
  ],
})
export class AdminModule { }
