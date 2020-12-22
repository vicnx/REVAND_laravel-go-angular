import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {AwardComponent} from './awards/award/award.component';
import {AwardResolver} from './awards/award/award-resolver.service';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
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
          },
        ] 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
