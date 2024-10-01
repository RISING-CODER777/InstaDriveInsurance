import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component'; // Adjust the path as needed

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value; // Correct field name

    if (username && password) { 
      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            this.authService.setToken(response.token);
            this.router.navigate(['/admin']);
          } else {
            this.openDialog("Invalid username or password"); // Show dialog on invalid response
          }
        },
        error: (error: any) => {
          this.openDialog("Invalid username or password"); // Show dialog on error
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    } else {
      this.openDialog("Please fill in all fields"); // Show dialog on empty form
    }
  }

  openDialog(message: string): void {
    this.dialog.open(ForgotPasswordDialogComponent, {
      data: { message } // Pass message to dialog
    });
  }
}
