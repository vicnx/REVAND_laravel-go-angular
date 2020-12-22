import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AwardsComponent } from './awards.component';
import { AwardComponent } from './award/award.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../../shared';
import { AwardRoutingModule } from './awards-routing.module';
import { AwardResolver } from './award/award-resolver.service';


@NgModule({
  imports: [SharedModule, AwardRoutingModule],
  declarations: [AwardsComponent,AwardComponent],
  providers: [AwardResolver]
})
export class AwardsModule {}
