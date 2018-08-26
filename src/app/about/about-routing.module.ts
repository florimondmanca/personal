import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MeComponent } from './me/me.component';
import { TechComponent } from './tech/tech.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      {
        path: '',
        redirectTo: 'me',
        pathMatch: 'full',
      },
      {
        path: 'me',
        component: MeComponent,
        data: { pageId: 'about-me', title: 'About me' },
      },
      {
        path: 'tech',
        component: TechComponent,
        data: { pageId: 'about-tech', title: 'About the Tech' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
