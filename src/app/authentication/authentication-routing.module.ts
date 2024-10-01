import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthenticationComponent } from './authentication.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-signup', component: UserSignupComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: '', redirectTo: 'user-login', pathMatch: 'full' } // Default route within this module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
