import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, SigninComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
