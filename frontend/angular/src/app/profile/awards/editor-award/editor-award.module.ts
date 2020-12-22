import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorAwardComponent } from './editor-award.component';
import { EditableAwardResolver } from './editable-award-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../../../shared';
import { EditorRoutingModule } from './editor-award-routing.module';

@NgModule({
  imports: [SharedModule, EditorRoutingModule],
  declarations: [EditorAwardComponent],
  providers: [EditableAwardResolver]
})
export class EditorAwardModule {}
