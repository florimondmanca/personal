import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BlogModule } from './blog/blog.module';

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
        // Eager loading of blog module routes.
        // NOTE: goal is that the / route be NOT lazy-loaded
        // which adds significant network/script evaluation work.
        loadChildren: () => BlogModule,
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
