import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductResolver } from './product/product-resolver.service';
import { NgImageSliderModule } from 'ng-image-slider';
 
@NgModule({
  imports: [SharedModule, ProductsRoutingModule,NgImageSliderModule],
  declarations: [ProductsComponent],
  providers: [ProductResolver]
})
export class ProductsModule {}
