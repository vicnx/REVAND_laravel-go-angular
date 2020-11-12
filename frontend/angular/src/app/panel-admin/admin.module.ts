import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [AdminComponent],
  // providers: [EditableAwardResolver]
})
export class AdminModule {}
