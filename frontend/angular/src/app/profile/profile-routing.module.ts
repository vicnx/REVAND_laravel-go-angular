import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';

import {ProfileResolver} from './profile-resolver.service';


const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: { user: ProfileResolver },
    children: [
      { 
        path: '',
        component: DashboardComponent,
      },
      { 
        path: 'settings',
        component: SettingsComponent,
      }
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
