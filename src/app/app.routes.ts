import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},

  {path: '', loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent)},

  {path: 'create', loadComponent:() => import('./pages/product-form/product-form.component').then(m => m.ProductFormComponent)},

  {path: 'edit/:id', loadComponent:() => import('./pages/product-form/product-form.component').then(m => m.ProductFormComponent)},
];
