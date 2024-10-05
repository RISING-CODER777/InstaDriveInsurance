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
import { MatIconModule } from '@angular/material/icon'; 
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateFilterPipe } from 'src/app/filter/date-filter.pipe'; // Adjust the path accordingly
import { StatusFilterPipe } from 'src/app/filter/status-filter.pipe';
import { MatNativeDateModule } from '@angular/material/core'; // Import the MatNativeDateModule
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddAdminBottomSheetComponent } from './templates/add-admin-bottom-sheet/add-admin-bottom-sheet.component';
import { AddAdminDialogComponent } from './templates/add-admin-dialog/add-admin-dialog.component';
import { ConfirmDialogComponent } from './templates/confirm-dialog/confirm-dialog.component';
import { EditAdminDialogComponent } from './templates/edit-admin-dialog/edit-admin-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component'; // Import MatDialogModule
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    NewApprovalComponent,
    ClaimsApprovalComponent,
    NewApprovalBottomSheetComponent,
    ClaimsApprovalBottomSheetComponent,
    AdminOptionsComponent,
    AdminPlansComponent,
    DateFilterPipe,
    StatusFilterPipe,
    AddAdminBottomSheetComponent,
    AddAdminDialogComponent,
    ConfirmDialogComponent,
    EditAdminDialogComponent,
    AddAdminComponent

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
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [],
})
export class AdminModule { }
