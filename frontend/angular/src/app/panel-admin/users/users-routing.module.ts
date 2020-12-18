import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserResolver } from './user/user-resolver.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      // {
      //   path:'editor',
      //   loadChildren: () => import('./editor-award/editor-award.module').then(m => m.EditorAwardModule)
      // }, 
      {
        path: ':id',
        component: UserComponent,
        resolve: {
          user: UserResolver
        }
      //   // loadChildren: './award/award.module#AwardModule'
      },
      // {
      //   path: '', redirectTo: 'editor', pathMatch: 'full'
      // },
      // { path: '**', component:  Page404balanceComponent}
    ],
    
  },
  // {
  //   path: '',
  //   component: AwardsComponent,
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path:'editor',
  //   loadChildren: () => import('./editor-award/editor-award.module').then(m => m.EditorAwardModule)
  // },
  //  {
  //   path: ':id',
  //   component: AwardComponent,
  //   resolve: {
  //     award: AwardResolver
  //   }
  //   // loadChildren: './award/award.module#AwardModule'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
