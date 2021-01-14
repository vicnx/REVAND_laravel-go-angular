import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
// import { SubscriptionComponent } from './subscription/subscription.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../../shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { SubscriptionResolver } from './subscription/subscription-resolver.service';


@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent],
  providers: [DashboardRoutingModule]
})
export class DashboardModule {}
