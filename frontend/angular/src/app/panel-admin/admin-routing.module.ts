import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { EditorComponent} from '../editor/editor.component'
// import { EditableAwardResolver } from './editable-award-resolver.service';
// import { AuthGuard } from '../core';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'editor-awards',
    loadChildren: () => import('../editor/editor.module').then(m => m.EditorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
