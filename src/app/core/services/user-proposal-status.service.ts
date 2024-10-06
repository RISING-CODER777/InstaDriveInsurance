import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { UserProposalStatus } from '../models/user-proposal-status.model'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProposalStatusService {
  private userProposalsEndpoint = environment.userProposalsEndpoint; 
  private userProposalSubject = new BehaviorSubject<UserProposalStatus | null>(null);
  userProposal$ = this.userProposalSubject.asObservable(); // Expose the BehaviorSubject as an observable

  constructor(private httpClient: HttpClient) {}

  // Fetch user proposal by ID
  getUserProposalById(id: number): Observable<UserProposalStatus> {
    const url = `${this.userProposalsEndpoint}/${id}`; 
    return this.httpClient.get<UserProposalStatus>(url).pipe(
      tap(proposal => {
        this.userProposalSubject.next(proposal); // Emit the new proposal status
      })
    );
  }

  // Fetch all user proposals (for future use)
  getAllUserProposals(): Observable<UserProposalStatus[]> {
    return this.httpClient.get<UserProposalStatus[]>(this.userProposalsEndpoint);
  }
}
