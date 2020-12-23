import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardResolver } from './dashboard-resolver.service';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent],
  providers: [DashboardResolver]
})
export class DashboardModule {}
