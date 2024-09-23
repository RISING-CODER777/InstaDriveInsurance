import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClaimRequest } from '../models/claim.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private claimsEndpoint = environment.claimsApprovalEndpoint;

  constructor(private httpClient: HttpClient) {}

  getClaimById(claimNumber: string): Observable<ClaimRequest> {
    const url = `${this.claimsEndpoint}?claimNumber=${claimNumber}`;
    return this.httpClient.get<ClaimRequest>(url);
  }

  updateClaimById(claimNumber: string, claim: ClaimRequest): Observable<ClaimRequest> {
    const url = `${this.claimsEndpoint}/${claimNumber}`;
    return this.httpClient.put<ClaimRequest>(url, claim);
  }
}
