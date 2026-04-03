import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing').then(c => c.Landing),
  },
  {
    path: 'menu',
    loadComponent: () => import('./features/menu/menu').then(c => c.Menu),
  },
  {
    path: '',
    loadChildren: () => import('./features/_layout/layout.routes')
      .then(r => r.layoutRoutes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];
