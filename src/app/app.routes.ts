import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { autosRoutes } from './pages/autos/autos.routes';
import { Error } from './pages/error/error';
export const routes: Routes = [
  {
    path: '',
    component: Inicio,

  },
  ...autosRoutes,
  {
    path: '404',
    component: Error,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
