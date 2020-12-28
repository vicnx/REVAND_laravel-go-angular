import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { ProductComponent } from './profile/products/product/product.component';
import { ProductResolver } from './profile/products/product/product-resolver.service';

const routes: Routes = [
  {
    path: 'admin-panel',
    loadChildren: () => import('./panel-admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadChildren: () => import(`./profile/products/products.module`).then(m => m.ProductsModule), pathMatch: 'full',
      },
      {
        path: ':slug',
        component: ProductComponent,
        resolve: {
          product: ProductResolver
        }
      },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
