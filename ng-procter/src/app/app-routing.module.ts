import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuardService } from './component/login/auth-guard';

export const Approutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '', canActivate: [AuthGuardService],
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/component/plannings', pathMatch: 'full' },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
