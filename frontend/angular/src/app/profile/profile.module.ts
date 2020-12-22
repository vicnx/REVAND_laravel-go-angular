import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
// import { EditableAwardResolver } from './editable-profile-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { SidebarProfileComponent } from './sidebar/profile-sidebar.component';
import { AwardResolver } from './awards/award/award-resolver.service';

@NgModule({
  declarations: [ProfileComponent,SidebarProfileComponent],
  imports: [
    SharedModule, 
    ProfileRoutingModule
  ],
  providers:[AwardResolver]

})
export class ProfileModule {}
