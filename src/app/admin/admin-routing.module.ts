import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/auth';
import { PostDetailResolver, DraftListResolver } from 'app/blogging-core';
import { CanDeactivateDirtyPost } from 'app/blogging-core';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { DraftsComponent } from './drafts/drafts.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: PostCreateComponent,
        canDeactivate: [CanDeactivateDirtyPost],
        data: { pageId: 'postCreate', title: 'Create post' },
      },
      {
        path: 'drafts',
        component: DraftsComponent,
        resolve: { paginator: DraftListResolver },
        data: { pageId: 'drafts', title: 'Drafts' },
      },
      {
        path: ':pk/edit',
        component: PostEditComponent,
        canDeactivate: [CanDeactivateDirtyPost],
        resolve: { post: PostDetailResolver },
        data: { pageId: 'postEdit' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
