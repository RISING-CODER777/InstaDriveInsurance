import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile!: UserProfile;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.getUserProfileDetails(3);
  }

  getUserProfileDetails(id: number): void {
    this.userProfileService.getUserProfileById(id).subscribe((data: UserProfile) => {
      this.userProfile = data;
    });
  }
}
