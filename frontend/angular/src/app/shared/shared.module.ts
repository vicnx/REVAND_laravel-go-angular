import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AwardListComponent } from './award-helpers';
// import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
// import { ListErrorsComponent } from './list-errors.component';
// import { ShowAuthedDirective } from './show-authed.directive'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    AwardListComponent
  ],
  exports: [
    AwardListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class SharedModule {}