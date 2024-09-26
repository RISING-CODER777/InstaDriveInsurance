import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './policy.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { PolicyStatusComponent } from './policy-status/policy-status.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; 
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    PolicyComponent,
    PolicyDetailComponent,
    PolicyListComponent,
    PolicyFormComponent,
    PolicyStatusComponent,
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
  ]
})
export class PolicyModule {}
