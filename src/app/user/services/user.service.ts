import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserPolicies } from '../models/user-policies.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userPoliciesEndpoint = environment.userPoliciesEndpoint;
  constructor( private HttpClient: HttpClient ) { }

  getUserPolicies(): Observable<UserPolicies[]> {
    return this.HttpClient.get<UserPolicies[]>(this.userPoliciesEndpoint);
  }  
}
