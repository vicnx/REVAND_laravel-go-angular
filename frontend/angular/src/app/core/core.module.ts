import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {ApiService,JwtService,AwardsService, SubscriptionService, UserService, RedisService, ProductService} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    AwardsService,
    SubscriptionService,
    UserService,
    ProductService
  ],
  declarations: []
})
export class CoreModule { }
