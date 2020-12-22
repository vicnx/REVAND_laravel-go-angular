import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'
import {DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    // redirectTo: 'dashboard',
    children: [
      { 
        path: 'dashboard',
        component: DashboardComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
