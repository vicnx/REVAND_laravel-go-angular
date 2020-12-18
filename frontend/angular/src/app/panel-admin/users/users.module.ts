import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
// import { EditableAwardResolver } from './editable-admin-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../../shared';
import { UserRoutingModule } from './users-routing.module';
import { UserResolver } from './user/user-resolver.service';


@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [UsersComponent,UserComponent],
  providers: [UserRoutingModule]
})
export class UsersModule {}
