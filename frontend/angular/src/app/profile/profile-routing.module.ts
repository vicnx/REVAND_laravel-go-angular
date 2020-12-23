import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardResolver} from './dashboard/dashboard-resolver.service';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    // redirectTo: 'dashboard',
    children: [
      { 
        path: ':username',
        component: DashboardComponent,
        resolve: {
          user: DashboardResolver
        },
        children: [
          {
            path: 'settings',
            component: DashboardComponent,
          }
        ]
      },
      { 
        
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
