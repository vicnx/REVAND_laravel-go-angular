import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { SidebarProfileComponent } from './sidebar/profile-sidebar.component';

@NgModule({
  declarations: [ProfileComponent,SidebarProfileComponent],
  imports: [
    SharedModule, 
    ProfileRoutingModule
  ],
  providers:[]

})
export class ProfileModule {}
