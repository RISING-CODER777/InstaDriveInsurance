import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClaimRequest } from '../models/claim-request.model'; 

@Injectable({
  providedIn: 'root'
})
export class ClaimRequestService {

  private claimRequestEndpoint = environment.claimRequestEndpoint; 

  constructor(private httpClient: HttpClient) {}

  submitClaimRequest(claimRequest: ClaimRequest): Observable<ClaimRequest> {
    return this.httpClient.post<ClaimRequest>(this.claimRequestEndpoint, claimRequest);
  }


}
