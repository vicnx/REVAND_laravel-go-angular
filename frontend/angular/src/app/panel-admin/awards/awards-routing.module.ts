import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwardsComponent } from './awards.component';
import { AwardResolver } from './award/award-resolver.service';
import { AwardComponent } from './award/award.component';

const routes: Routes = [
  {
    path: '',
    component: AwardsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path:'editor',
    loadChildren: () => import('./editor-award/editor-award.module').then(m => m.EditorAwardModule)
  },
   {
    path: ':id',
    component: AwardComponent,
    resolve: {
      award: AwardResolver
    }
    // loadChildren: './award/award.module#AwardModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardRoutingModule {}
