import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { environment } from 'src/environments/environment';
import { UserAvatar } from 'src/app/user/models/user-avatar.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfilesEndpoint = environment.userProfileEndpoint; 
  private updateUserProfileEndpoint = environment.updateUserProfileEndpoint; 
  private userAvatarEndpoint = environment.userAvatarEndpoint;

  constructor(private httpClient: HttpClient) {}

  // Fetch user profile by ID
  getUserProfileById(id: number): Observable<UserProfile> {
    const url = `${this.userProfilesEndpoint}/${id}`; 
    return this.httpClient.get<UserProfile>(url);
  }

  // Update user profile
  updateUserProfile(userId: number, userProfile: UserProfile): Observable<UserProfile> {
    const url = `${this.updateUserProfileEndpoint}/${userId}`; // Use userId in URL
    return this.httpClient.put<UserProfile>(url, userProfile);
  }


  // Method to fetch user avatar by ID
  getUserAvatar(userId: number): Observable<UserAvatar> {
    return this.httpClient.get<UserAvatar>(`${this.userAvatarEndpoint}/${userId}`);
  }
}
