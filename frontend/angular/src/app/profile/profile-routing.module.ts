import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {ProductsComponent} from './products/products.component';


import {ProfileResolver} from './profile-resolver.service';


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
        path: 'products',
        loadChildren: () => import(`./products/products.module`).then(m => m.ProductsModule), pathMatch: 'full',
      }
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
