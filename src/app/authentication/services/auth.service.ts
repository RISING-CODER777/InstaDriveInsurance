import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Observable, of, BehaviorSubject } from 'rxjs';
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

  // BehaviorSubject to track user login status and profile details
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userProfileSubject = new BehaviorSubject<any>(null); // For user profile

  constructor(private http: HttpClient, private router: Router) {}

  // Observable to expose the current authentication state and profile
  authStatus$ = this.authStatus.asObservable();
  userProfile$ = this.userProfileSubject.asObservable();

  // Method to update authentication status
  updateAuthStatus(status: boolean): void {
    this.authStatus.next(status);
  }

  // Method to update user profile
  updateUserProfile(profile: any): void {
    this.userProfileSubject.next(profile);
  }

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
    // Update the authentication state when the token is set
    this.updateAuthStatus(true);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    // Update the authentication state when the token is removed
    this.updateAuthStatus(false);
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
    return userDetails ? userDetails.role : null; // Get user role
  }

  // Logout user, clear token, and reset user profile
  logout(): void {
    const role = this.getRole(); // Get the role of the user
    this.removeToken();
    this.updateUserProfile(null); // Reset the profile

    // Redirect based on user role
    if (role === 'admin') {
      this.router.navigate(['/authentication/admin-login']); // Redirect to admin login page
    } else {
      this.router.navigate(['/']); // Redirect to home page for users
    }
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
