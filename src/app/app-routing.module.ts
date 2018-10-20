import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    component: MainComponent,
    data: { pageId: 'main' },
    children: [
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule',
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
        data: { pageId: 'privacy' },
      },
      {
        path: 'a',
        loadChildren: './admin/admin.module#AdminModule',
      },
      // Should be at the bottom because '' matches everything
      {
        path: '',
        loadChildren: './blog/blog.module#BlogModule',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  // initialNavigation fixes page flickering when using SSR
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
