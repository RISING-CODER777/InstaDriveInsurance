import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;  // Define the form group

  constructor(
    private fb: FormBuilder,       // Inject FormBuilder
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Initialize the form when the component is loaded
  }

  // Initialize the form with a single control for the email
  initializeForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]  // Email field with validation
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;  // If the form is invalid, stop here
    }

    const email: string = this.forgotPasswordForm.get('email')?.value;
    // Get the email value
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        // Success: Notify the user that the reset link was sent
        this.showDialog(`Please check your email to reset your password.`);
      },
      error: (error) => {
        // Handle different error responses
        if (error.status === 404) {
          // User not found with the entered email
          this.showDialog(`User not found with this email: ${email}`);
        } else {
          // General error handling (if needed)
          this.showDialog(`An unexpected error occurred. Please try again later.`);
        }
      },
      complete: () => {
        // Optional: Add any logic to handle when the observable completes
      }
    });

  }


  // Show a dialog with the provided message
  showDialog(message: string) {
    this.dialog.open(ForgotPasswordDialogComponent, {
      data: { message }  // Pass the message to the dialog component
    });
  }
}
