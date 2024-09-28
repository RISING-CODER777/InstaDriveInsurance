import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})

export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const passwordHash = this.loginForm.get('password')?.value; // Changed to match DTO

    if (username && passwordHash) { // Change here too
      this.authService.login(username, passwordHash).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            this.authService.setToken(response.token);
            // You can decode token here to get user details
            this.router.navigate(['/admin']);
          } else {
            console.error('Invalid response');
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('Request completed');
        }
      });
    } else {
      console.error('Invalid form values');
    }
  }

  hide = true;

}
