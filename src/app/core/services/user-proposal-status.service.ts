import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProposalStatus } from '../models/user-proposal-status.model'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProposalStatusService {
  private userProposalsEndpoint = environment.userProposalsEndpoint; 

  constructor(private httpClient: HttpClient) {}

  // Fetch user proposal by ID
  getUserProposalById(id: number): Observable<UserProposalStatus> {
    const url = `${this.userProposalsEndpoint}/${id}`; 
    return this.httpClient.get<UserProposalStatus>(url);
  }

  // Fetch all user proposals (for future use)
  getAllUserProposals(): Observable<UserProposalStatus[]> {
    return this.httpClient.get<UserProposalStatus[]>(this.userProposalsEndpoint);
  }
}
