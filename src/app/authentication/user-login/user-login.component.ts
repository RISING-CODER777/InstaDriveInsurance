import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})

export class UserLoginComponent implements OnInit {

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
    const passwordHash = this.loginForm.get('password')?.value; // Renamed here to match the DTO

    if (username && passwordHash) { // Change here too
      this.authService.login(username, passwordHash).subscribe({
        next: (response: any) => {
          if (response && response.token) {
            this.authService.setToken(response.token);
            // You can decode token here to get user details
            this.router.navigate(['']);
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
