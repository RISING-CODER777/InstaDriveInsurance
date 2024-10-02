import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserSignUp } from '../models/user-signup.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginEndpoint = environment.loginEndpoint;
  private userSignUpEndpoint = environment.userSignUpEndpoint;
  private forgotPwdEndpoint = environment.forgotPwdEndpoint;
  private resetPwdEndpoint = environment.resetPwdEndpoint;

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(signUpData: UserSignUp): Observable<any> {
    return this.http.post(this.userSignUpEndpoint, signUpData);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    return this.http.post(this.loginEndpoint, loginData, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    );
  }

  // Token handling methods
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  // Decode token and check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken && !this.isTokenExpired(decodedToken);
    }
    return false;
  }

  // Decode the JWT token
  decodeToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token); // Decode the token
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  // Check if the token is expired
  isTokenExpired(decodedToken: any): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  // Get user details dynamically from the token
  getUserDetails(): any {
    const token = this.getToken();
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  getUserId(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.sub : null; // Fetching user ID from token
  }

  getUsername(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.unique_name : null;
  }

  getRole(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.role : null;
  }

  // Logout user and clear token
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  // Forgot Password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.forgotPwdEndpoint, { email });
  }

  // Reset Password
  resetPassword(email: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(this.resetPwdEndpoint, { email, token, newPassword });
  }
}
