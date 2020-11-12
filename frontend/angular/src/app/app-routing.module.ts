import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
    // loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./panel-admin/admin.module').then(m => m.AdminModule)
    // loadChildren: './editor/editor.module#EditorModule'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
