import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  imports: [SharedModule, ProductsRoutingModule],
  declarations: [ProductsComponent],
  providers: []
})
export class ProductsModule {}
