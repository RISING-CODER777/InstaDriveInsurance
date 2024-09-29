import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSignupValidators } from 'src/app/validators/user-signup-validators'; // Import custom validators
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component'; // Adjust the path as needed
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;
  email!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    // Extract token and email from the URL parameters
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    this.email = this.route.snapshot.queryParamMap.get('email')!;

    // Initialize the form with validators
    this.initializeForm();
  }

  // Initialize the form and add validators for password strength and confirmation
  initializeForm() {
    this.resetPasswordForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]], // Include email field
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        UserSignupValidators.passwordStrengthValidator
      ]],
      confirmPassword: ['', [
        Validators.required,
        UserSignupValidators.confirmPasswordValidator('password')
      ]]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;  // Exit if the form is invalid
    }

    const enteredEmail = this.resetPasswordForm.get('email')?.value;
    const newPassword = this.resetPasswordForm.get('password')?.value;

    // Check if the entered email matches the email in the URL
    if (enteredEmail !== this.email) {
      this.openDialog("User not found");
      return; // Exit if emails do not match
    }

    this.authService.resetPassword(this.email, this.token, newPassword).subscribe({
      next: (response) => {
        // Show success dialog
        this.openDialog("Password reset is successful");
        this.router.navigate(['/authentication/user-login']);
      },
      error: (error) => {
        // Show error dialog if there's another issue
        this.openDialog("An error occurred while resetting the password");
        console.error('Error resetting password:', error);
      },
      complete: () => {
        console.log('Password reset process completed.');
      }
    });
  }

  openDialog(message: string): void {
    this.dialog.open(ForgotPasswordDialogComponent, {
      data: { message } // Pass message to dialog
    });
  }
}
