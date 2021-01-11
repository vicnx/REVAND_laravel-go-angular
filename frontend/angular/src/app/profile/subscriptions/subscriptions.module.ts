import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SubscriptionsComponent } from './subscriptions.component';
import { SharedModule } from '../../shared';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';


@NgModule({
  imports: [SharedModule, SubscriptionsRoutingModule],
  declarations: [SubscriptionsComponent],
  providers: []
})
export class SubscriptionsModule {}
