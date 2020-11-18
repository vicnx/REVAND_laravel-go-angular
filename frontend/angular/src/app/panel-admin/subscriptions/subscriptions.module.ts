import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubscriptionsComponent } from './subscriptions.component';
// import { SubscriptionComponent } from './subscriptions/subscription.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../../shared';
import { SubscriptionRoutingModule } from './subscriptions-routing.module';
// import { AwardResolver } from './award/award-resolver.service';


@NgModule({
  imports: [SharedModule, SubscriptionRoutingModule],
  declarations: [SubscriptionsComponent],
  providers: [SubscriptionRoutingModule]
})
export class SubscriptionsModule {}
