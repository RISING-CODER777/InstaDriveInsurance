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
  hide = true;

  constructor(private authService: AuthService, private router: Router) { }

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
}
