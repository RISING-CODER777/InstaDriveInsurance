import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AdminPlans } from '../models/admin-plans.model';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.scss']
})
export class AdminPlansComponent implements OnInit { // Implementing OnInit
  adminPlansForm: FormGroup;
  vehicleTypes = ['Bike', 'Car', 'Truck'];
  planTypes = ['ThirdParty', 'Comprehensive', 'OwnDamage'];
  planNames = ['Premium plan', 'Basic plan'];

  constructor(private builder: FormBuilder, private adminService: AdminService) { // Injecting AdminService
    this.adminPlansForm = this.builder.group({
      vehicleType: ['', Validators.required],
      planType: ['', Validators.required],
      planName: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      basePremium: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.adminPlansForm.valid) {
      const adminPlan: AdminPlans = this.adminPlansForm.value;
      this.adminService.addPlan(adminPlan).subscribe({
        next: (res) => {
          console.log('Plan added successfully', res);
          this.adminPlansForm.reset();
        },
        error: (err) => {
          console.error('Error adding plan', err);
        }
      });
    }
  }
}
