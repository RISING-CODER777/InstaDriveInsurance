import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AdminPlans } from '../models/admin-plans.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.scss']
})
export class AdminPlansComponent implements OnInit {
  adminPlansForm: FormGroup;
  vehicleTypes = ['Bike', 'Car', 'Truck'];
  planTypes = ['Third Party', 'Basic', 'Comprehensive'];

  constructor(
    private builder: FormBuilder, 
    private adminService: AdminService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.adminPlansForm = this.builder.group({
      vehicleType: ['', Validators.required],
      planType: ['', Validators.required],
      planName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      basePremium: ['', [Validators.required, Validators.min(0.01)]], // Set minimum to 0.01
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.adminPlansForm.valid) {
      const adminPlan: AdminPlans = this.adminPlansForm.value;
      this.adminService.addPlan(adminPlan).subscribe({
        next: (res) => {
          console.log('Plan added successfully', res);
          this.openSnackBar('Plan added successfully!', 'Close'); // Show snackbar
          
          // Reset the form
          this.adminPlansForm.reset();
          
          // Clear validation errors manually
          Object.keys(this.adminPlansForm.controls).forEach(key => {
            this.adminPlansForm.get(key)?.setErrors(null);
          });
        },
        error: (err) => {
          console.error('Error adding plan', err);
          this.openSnackBar('Error adding plan. Please try again.', 'Close'); // Show error snackbar
        }
      });
    }
  }

  // Method to open a snackbar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration for snackbar in milliseconds
    });
  }
}
