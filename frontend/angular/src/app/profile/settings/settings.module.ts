import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../shared';
import { SettingsRoutingModule } from './settings-routing.module';


@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: [SettingsComponent],
  providers: []
})
export class SettingsModule {}
