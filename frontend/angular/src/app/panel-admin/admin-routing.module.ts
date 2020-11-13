import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AwardsModule} from './awards/awards.module'

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'awards', loadChildren: () => import(`./awards/awards.module`).then(m => m.AwardsModule) },
      // {
      //   path: '', redirectTo: 'awards', pathMatch: 'full'
      // },
    ]
  }
  // {
  //   path: '',
  //   component: AdminComponent,
  //   pathMatch: 'full'
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path:'awards',
  //   loadChildren: () => import('./awards/awards.module').then(m => m.AwardsModule),
  //   // outlet:'admin'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
