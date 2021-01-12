import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HeaderComponent,SharedModule } from './shared';
import { MainAuthModalComponent } from './login/main-auth-modal.component'
import { RegisterModalComponent } from './login/register-modal.component'
import { LoginModalComponent } from './login/login-modal.component'
import { AuthModalComponent } from './login/auth-modal.component'
import { RedisService } from './core';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductResolver } from './profile/products/product/product-resolver.service';
import { NgImageSliderModule } from 'ng-image-slider';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


// import { ProductListComponent } from './shared/product-helpers';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome' 


@NgModule({
  declarations: [AppComponent, HeaderComponent, MainAuthModalComponent, RegisterModalComponent, AuthModalComponent, LoginModalComponent ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    NgImageSliderModule,
    IvyCarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    RedisService,
    ProductResolver    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
