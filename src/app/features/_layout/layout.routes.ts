import { Routes } from "@angular/router";
import { loginGuard } from "../../core/guards/login.guard";

export const layoutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main')
      .then(c => c.Main),
    children: [
      {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('./../auth/login/login')
          .then(c => c.Login)
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
]
