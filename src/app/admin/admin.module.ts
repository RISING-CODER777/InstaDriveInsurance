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
import { FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewApprovalComponent,
    ClaimsApprovalComponent,
    NewApprovalBottomSheetComponent,
    ClaimsApprovalBottomSheetComponent
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
    MatSelectModule
  ]
})
export class AdminModule { }
