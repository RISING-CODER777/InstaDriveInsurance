import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewApprovalComponent } from './new-approval/new-approval.component';
import { ClaimsApprovalComponent } from './claims-approval/claims-approval.component';
import {MatListModule} from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NewApprovalBottomSheetComponent } from './templates/new-approval-bottom-sheet/new-approval-bottom-sheet.component';
import { ClaimsApprovalBottomSheetComponent } from './templates/claims-approval-bottom-sheet/claims-approval-bottom-sheet.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminOptionsComponent } from './admin-options/admin-options.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewApprovalComponent,
    ClaimsApprovalComponent,
    NewApprovalBottomSheetComponent,
    ClaimsApprovalBottomSheetComponent,
    AdminOptionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatGridListModule,
    MatInputModule
  ],
  providers: [],
})
export class AdminModule { }
