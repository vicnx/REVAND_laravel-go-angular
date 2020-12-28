import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductResolver } from './product/product-resolver.service';
import { ProductComponent } from './product/product.component';
import { EditorProductResolver } from './editor/editor-product-resolver.service';
import { EditorProductComponent  } from './editor/editor-product.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent, 
    loadChildren: () => import(`./product/product.module`).then(m => m.ProductModule), pathMatch: 'full',
    children: [
      {
        path: 'create',
        component: EditorProductComponent,
        resolve: {
          product: EditorProductResolver
        }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
