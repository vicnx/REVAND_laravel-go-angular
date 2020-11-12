import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AwardsComponent } from './awards.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../../shared';
import { AwardRoutingModule } from './awards-routing.module';

@NgModule({
  imports: [SharedModule, AwardRoutingModule],
  declarations: [AwardsComponent],
  // providers: [EditableAwardResolver]
})
export class AwardsModule {}
