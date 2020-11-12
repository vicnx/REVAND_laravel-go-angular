import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { EditableAwardResolver } from './editable-award-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: EditorComponent,
    // canActivate: [AuthGuard],
    resolve: {
      award: EditableAwardResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}
