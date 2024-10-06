import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { AdminOptions } from '../models/admin-options.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.scss']
})
export class AdminOptionsComponent implements OnInit {
  adminOptionsForm: FormGroup;

  optionTypes = ['Add On', 'Accident Cover', 'Accessory Cover'];

  constructor(
    private builder: FormBuilder, 
    private adminService: AdminService, 
    private snackBar: MatSnackBar
  ) {
    this.adminOptionsForm = this.builder.group({
      optionType: ['', Validators.required],
      optionName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      coverageAmount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  handleSubmit() {
    // Mark all controls as touched to show validation messages only after submission
    this.adminOptionsForm.markAllAsTouched();

    if (this.adminOptionsForm.valid) {
      const adminOption: AdminOptions = this.adminOptionsForm.value;
      this.adminService.addOption(adminOption).subscribe({
        next: (res) => {
          console.log('Option added successfully', res);
          this.snackBar.open('Insurance option added successfully!', 'Close', {
            duration: 3000,
          });
          // Reset form after successful submission
          this.adminOptionsForm.reset();
        },
        error: (err) => {
          console.error('Error adding option', err);
        }
      });
    }
  }
}
