import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorProductComponent } from './editor-product.component';
// import { EditorProductCommentComponent } from './EditorProduct-comment.component';
import { EditorProductResolver } from './editor-product-resolver.service';
// import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../../../shared';
import { EditorProductRoutingModule } from './editor-product-routing.module';

@NgModule({
  imports: [
    SharedModule,
    EditorProductRoutingModule
  ],
  declarations: [
    EditorProductComponent,
  ],
  providers: [
    EditorProductResolver
  ]
})
export class EditorProductModule {}
