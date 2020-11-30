import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HeaderComponent,SharedModule } from './shared';
import { AuthModalComponent } from './login/auth-modal.component'
import { RegisterModalComponent } from './login/register-modal.component'
// import { AuthModalComponent } from './login/auth-modal.component'
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome' 


@NgModule({
  declarations: [AppComponent, HeaderComponent, AuthModalComponent, RegisterModalComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
