import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './authentication/guards/admin-guard';

const routes: Routes = [
{ path: '', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
{ path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
{ path: 'policy', loadChildren: () => import('./policy/policy.module').then(m => m.PolicyModule) },
{ path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
{ path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
{ path: '**', redirectTo: 'error/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
