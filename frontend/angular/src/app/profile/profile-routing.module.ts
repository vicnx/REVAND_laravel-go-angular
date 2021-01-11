import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductResolver } from './products/product/product-resolver.service';
import { EditorProductResolver } from './products/editor/editor-product-resolver.service';
import { EditorProductComponent  } from './products/editor/editor-product.component';



import { ProfileResolver } from './profile-resolver.service';


const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: { user: ProfileResolver },
    children: [
      {
        path: '',
        loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule), pathMatch: 'full',
      },
      {
        path: 'dashboard',
        redirectTo: '',
        loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule), pathMatch: 'full',
      },
      {
        path: 'settings',
        loadChildren: () => import(`./settings/settings.module`).then(m => m.SettingsModule), pathMatch: 'full',
      },
      {
        path: 'buy',
        loadChildren: () => import(`./subscriptions/subscriptions.module`).then(m => m.SubscriptionsModule), pathMatch: 'full',
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: () => import(`./products/products.module`).then(m => m.ProductsModule), pathMatch: 'full',
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
      {
        path: 'upload',
        component: EditorProductComponent,
      },
      {
        path: 'edit',
        children: [
          {
            path: '',
            loadChildren: () => import(`./products/editor/editor-product.module`).then(m => m.EditorProductModule), pathMatch: 'full',
          },
          {
            path: ':slug',
            component: EditorProductComponent,
            resolve: {
              product: EditorProductResolver
            }
          },
        ]

      },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
