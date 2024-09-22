import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewApproval } from '../models/new-approval.model';
import { Proposal } from 'src/app/core/models/proposal.model';
import { Claim } from '../models/claim-approval.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private newApprovalEndpoint = environment.newApprovalEndpoint;
  private claimsApprovalEndpoint = environment.claimsApprovalEndpoint;

  constructor(private HttpClient: HttpClient) { }

  /* Dashboard */



  /* New Approval */
  getNewApproval(): Observable<NewApproval[]> {
    return this.HttpClient.get<NewApproval[]>(this.newApprovalEndpoint);
  }  

  
  
  /* Claims Approval */
  getClaims(): Observable<Claim[]>{
    return this.HttpClient.get<Claim[]>(this.claimsApprovalEndpoint);
  }
    

}
