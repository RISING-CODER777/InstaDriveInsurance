import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewApprovalComponent } from './new-approval/new-approval.component';
import { ClaimsApprovalComponent } from './claims-approval/claims-approval.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-approval', component: NewApprovalComponent},
  { path: 'claims-approval', component: ClaimsApprovalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
