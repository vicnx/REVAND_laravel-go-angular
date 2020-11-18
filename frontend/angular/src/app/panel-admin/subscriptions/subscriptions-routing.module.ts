import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionResolver } from './subscription/subscription-resolver.service';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {
    path: '', component: SubscriptionsComponent, children: [
      // {
      //   path:'editor',
      //   loadChildren: () => import('./editor-award/editor-award.module').then(m => m.EditorAwardModule)
      // }, 
      {
        path: ':id',
        component: SubscriptionComponent,
        resolve: {
          subscription: SubscriptionResolver
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
export class SubscriptionRoutingModule {}
