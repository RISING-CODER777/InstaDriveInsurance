import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/services/admin.service';
import { UserSignupValidators } from 'src/app/validators/user-signup-validators';

@Component({
  selector: 'app-add-admin-dialog',
  templateUrl: './add-admin-dialog.component.html',
  styleUrls: ['./add-admin-dialog.component.scss']
})
export class AddAdminDialogComponent {

  adminFormGroup1: FormGroup; // FormGroup for Admin Details
  adminFormGroup2: FormGroup; // FormGroup for Contact Details
  adminFormGroup3: FormGroup; // FormGroup for Identification & Security
  isLoading: boolean = false; // To handle loading state
  admins: any[] = []; // List of admins
  currentStep: number = 0; // Track current step

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddAdminDialogComponent> // FormBuilder for reactive forms
  ) {
    // Initialize the form groups
    this.adminFormGroup1 = this.fb.group({
      username: ['', Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    this.adminFormGroup2 = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, UserSignupValidators.phoneNumberValidator()]],
      address: ['', Validators.required],
    });

    this.adminFormGroup3 = this.fb.group({
      aadharNumber: ['', [Validators.required, UserSignupValidators.aadhaarValidator()]],
      panNumber: ['', Validators.required],
      password: ['', [Validators.required, UserSignupValidators.passwordStrengthValidator()]]
    });
  }



  ngOnInit() {
    this.loadAdmins();
  }

  // Method to navigate to the next step
  next() {
    if (this.currentStep < 2) { // Assuming 0, 1, 2 are valid step indices
      this.currentStep++;
    }
  }

  // Load all admins on component initialization
  private loadAdmins() {
    this.toggleLoading(true); // Start loading state

    this.adminService.getAllAdmins().subscribe({
      next: (res: any[]) => {
        this.admins = res; // Load the admins into the array
        this.toggleLoading(false); // Stop loading state
      },
      error: (err) => {
        console.error('Error loading admins:', err);
        this.toggleLoading(false); // Stop loading state
        this.showSnackBar('Error loading admins. Please try again.', 'error');
      }
    });
  }

  onAddAdmin() {
    // Prevent multiple submissions and validate all forms
    if (this.isLoading || this.adminFormGroup1.invalid || this.adminFormGroup2.invalid || this.adminFormGroup3.invalid) return;

    this.toggleLoading(true); // Start loading state

    // Collect form values, including the password
    const newAdmin = {
      ...this.adminFormGroup1.value,
      ...this.adminFormGroup2.value,
      ...this.adminFormGroup3.value,
      passwordHash: this.adminFormGroup3.get('password')?.value, // Include the password from the form
      role: 'Admin' // Explicitly set the role to 'Admin' as it's required by the backend
    };

    // Call the admin service to add the new admin
    this.adminService.addAdmin(newAdmin).subscribe({
      next: (res: any) => {
        this.admins.push(res); // Add the new admin with generated userID to the list
        this.resetForms(); // Reset the forms after successful submission
        this.toggleLoading(false); // Stop loading state
        this.showSnackBar('Admin added successfully!', 'success');
        this.dialogRef.close(); // Close the dialog only after successful submission
      },
      error: (err) => {
        console.error('Error adding admin:', err);
        this.toggleLoading(false); // Stop loading state in case of error
        this.showSnackBar('Error adding admin. Please try again.', 'error');
        // Do not close the dialog if there's an error
      }
    });
  }




  // Reset the forms to the initial state
  private resetForms() {
    this.adminFormGroup1.reset();
    this.adminFormGroup2.reset();
    this.adminFormGroup3.reset();
  }

  // Delete admin
  deleteAdmin(admin: any) {
    if (this.isLoading) return; // Prevent multiple operations
    this.toggleLoading(true); // Start loading state

    this.adminService.deleteAdmin(admin.userID).subscribe({
      next: () => {
        this.admins = this.admins.filter((a) => a.userID !== admin.userID); // Remove deleted admin from list
        this.toggleLoading(false); // Stop loading state
        this.showSnackBar('Admin deleted successfully!', 'success');
      },
      error: (err) => {
        console.error('Error deleting admin:', err);
        this.toggleLoading(false); // Stop loading state
        this.showSnackBar('Error deleting admin. Please try again.', 'error');
      }
    });
  }

  // Helper function to show snack bar notifications
  private showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }

  // Helper function to toggle loading state
  private toggleLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
