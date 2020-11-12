import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from './awards.component';

const routes: Routes = [
  {
    path: '',
    component: AwardsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'editor',
    loadChildren: () => import('./editor-award/editor-award.module').then(m => m.EditorAwardModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardRoutingModule {}
