import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './policy.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { PolicyStatusComponent } from './policy-status/policy-status.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
const routes: Routes = [
  { path: 'policy-form', component: PolicyFormComponent },
  { path: 'policy-detail', component: PolicyDetailComponent },
  { path: 'policy-list', component: PolicyListComponent}
  { path: 'policy-detail', component: PolicyDetailComponent },
  { path: 'policy-status', component: PolicyStatusComponent } 

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
