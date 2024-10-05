import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserPolicies } from '../models/user-policies.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAvatar } from '../models/user-avatar.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userPoliciesEndpoint = environment.userPoliciesEndpoint;
  private userAvatarEndpoint = environment.userAvatarEndpoint;

  constructor(private httpClient: HttpClient) {} // Note: renamed HttpClient to httpClient for better readability

  // Method to get user policies by user ID
  getUserPolicies(userId: number): Observable<UserPolicies[]> {
    return this.httpClient.get<UserPolicies[]>(`${this.userPoliciesEndpoint}/${userId}`);
  }

  // Method to update user avatar
  updateUserAvatar(userAvatar: UserAvatar): Observable<void> {
    return this.httpClient.post<void>(this.userAvatarEndpoint, userAvatar); // Assuming POST for updating
  }

  // Method to get user avatar by user ID, returning an object with a 'url' property
  getUserAvatar(userId: number): Observable<{ url: string }> {
    return this.httpClient.get<{ url: string }>(`${this.userAvatarEndpoint}/${userId}`);
  }
}
