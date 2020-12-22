import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorAwardComponent } from './editor-award.component';
import { EditableAwardResolver } from './editable-award-resolver.service';
// import { AuthGuard } from '../core';
// import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: EditorAwardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: EditorAwardComponent,
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
