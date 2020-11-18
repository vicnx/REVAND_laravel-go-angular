import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AwardComponent} from './awards/award/award.component';
import {AwardResolver} from './awards/award/award-resolver.service';
import { SubscriptionResolver } from './subscriptions/subscription/subscription-resolver.service';
import { SubscriptionComponent } from './subscriptions/subscription/subscription.component';



const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'awards', 
        // loadChildren: () => import(`./awards/awards.module`).then(m => m.AwardsModule),
        children: [
          {
            path:'editor',
            loadChildren: () => import('./awards/editor-award/editor-award.module').then(m => m.EditorAwardModule)
          }, 
          {
            path: '', loadChildren: () => import(`./awards/awards.module`).then(m => m.AwardsModule), pathMatch: 'full'
          },
          {
            path: ':id',
            component: AwardComponent,
            resolve: {
              award: AwardResolver
            }
            // loadChildren: './award/award.module#AwardModule'
          },
        ] 
      },
      { path: 'subscriptions', 
      children: [
        // {
        //   path:'editor',
        //   loadChildren: () => import('./awards/editor-award/editor-award.module').then(m => m.EditorAwardModule)
        // }, 
        {
          path: '', loadChildren: () => import(`./subscriptions/subscriptions.module`).then(m => m.SubscriptionsModule), pathMatch: 'full'
        },
        {
          path: ':id',
          component: SubscriptionComponent,
          resolve: {
            award: SubscriptionResolver
          }
        }
        //   // loadChildren: './award/award.module#AwardModule'
        // },
      ] 
    },
      // {
      //   path: '', redirectTo: 'awards', pathMatch: 'full'
      // },
    ]
  }
  // {
  //   path: '',
  //   component: AdminComponent,
  //   pathMatch: 'full'
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path:'awards',
  //   loadChildren: () => import('./awards/awards.module').then(m => m.AwardsModule),
  //   // outlet:'admin'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
