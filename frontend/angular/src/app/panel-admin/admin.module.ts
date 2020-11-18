import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarAdminComponent } from './sidebar/sidebar.component';
import { AwardResolver } from './awards/award/award-resolver.service';
import { SubscriptionResolver } from './subscriptions/subscription/subscription-resolver.service';

@NgModule({
  declarations: [AdminComponent,SidebarAdminComponent],
  imports: [
    SharedModule, 
    AdminRoutingModule
  ],
  providers:[AwardResolver,SubscriptionResolver]

})
export class AdminModule {}
