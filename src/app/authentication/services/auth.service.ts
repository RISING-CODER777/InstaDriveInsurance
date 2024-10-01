import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserSignUp } from '../models/user-signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginEndpoint = environment.loginEndpoint;
  private userSignUpEndpoint = environment.userSignUpEndpoint;
  private forgotPwdEndpoint = environment.forgotPwdEndpoint;
  private resetPwdEndpoint = environment.resetPwdEndpoint;

  constructor(private http: HttpClient) { }

  userSignUp(signUpData: UserSignUp): Observable<any> {
    return this.http.post(this.userSignUpEndpoint, signUpData);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password // Correct field name
    };

    return this.http.post(this.loginEndpoint, loginData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  getUserDetails(): any {
    const token = this.getToken();
    if (token) {
      return jwt_decode.jwtDecode(token); // Decode the JWT and extract user details
    }
    return null;
  }

  getUserId(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.sub : null; // 'sub' refers to user ID in standard JWT claims
  }

  getUsername(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.unique_name : null; // 'unique_name' for username in standard JWT claims
  }

  getRole(): string | null {
    const userDetails = this.getUserDetails();
    return userDetails ? userDetails.role : null; // 'role' refers to user role in custom JWT claims
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.forgotPwdEndpoint, { email });
  }

  resetPassword(email: string, token: string, newPassword: string) {
    return this.http.post(this.resetPwdEndpoint, { email, token, newPassword });
}

}
