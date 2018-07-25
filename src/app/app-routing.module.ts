import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';

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
        component: AboutComponent,
        data: { pageId: 'about', title: 'About' },
      },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
