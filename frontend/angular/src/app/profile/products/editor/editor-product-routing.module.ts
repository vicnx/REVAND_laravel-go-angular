import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorProductComponent } from './editor-product.component';
import { EditorProductResolver } from './editor-product-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EditorProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorProductRoutingModule {}
