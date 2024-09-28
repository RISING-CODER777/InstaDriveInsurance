import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewApprovalComponent } from './new-approval/new-approval.component';
import { ClaimsApprovalComponent } from './claims-approval/claims-approval.component';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new-approval', component: NewApprovalComponent},
  { path: 'claims-approval', component: ClaimsApprovalComponent},
  { path: 'admin-options', component: AdminOptionsComponent },
  { path: 'admin-plans', component: AdminPlansComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
