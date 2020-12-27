import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
// import { ProductCommentComponent } from './Product-comment.component';
import { ProductResolver } from './product-resolver.service';
// import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../../../shared';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent,
  ],

  providers: [
    ProductResolver
  ]
})
export class ProductModule {}
