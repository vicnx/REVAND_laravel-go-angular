import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileResolver } from './profile-resolver.service';
import { ProductResolver } from './products/product/product-resolver.service';
import { EditorProductResolver } from './products/editor/editor-product-resolver.service';

import { SidebarProfileComponent } from './sidebar/profile-sidebar.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';

@NgModule({
  declarations: [ProfileComponent,SidebarProfileComponent],
  imports: [
    SharedModule, 
    ProfileRoutingModule,
    IvyCarouselModule
  ],
  providers:[ProfileResolver,ProductResolver,EditorProductResolver]

})
export class ProfileModule {}
