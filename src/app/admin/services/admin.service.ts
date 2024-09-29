import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewApproval } from '../models/new-approval.model';
import { Proposal } from 'src/app/core/models/proposal.model';
import { Claim } from '../models/claim-approval.model';
import { NewApprovalStatusUpdate } from '../models/new-approval-status-update.model';
import { ClaimStatusUpdate } from '../models/claim-status-update.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private newApprovalEndpoint = environment.newApprovalEndpoint;
  private claimsApprovalEndpoint = environment.claimsApprovalEndpoint;
  private updateProposalStatusEndpoint = environment.updateProposalStatusEndpoint;
  private claimApprovalStatusUpdateEndpoint = environment.claimApprovalStatusUpdateEndpoint; // Add this endpoint for updating claim approval


  constructor(private HttpClient: HttpClient) { }

  /* Dashboard */



  /* New Approval */
  getNewApproval(): Observable<NewApproval[]> {
    console.log(this.HttpClient.get<NewApproval[]>(this.newApprovalEndpoint));

    return this.HttpClient.get<NewApproval[]>(this.newApprovalEndpoint);
  }  

  
  
  /* Claims Approval */
  getClaims(): Observable<Claim[]>{
    return this.HttpClient.get<Claim[]>(this.claimsApprovalEndpoint);
  }


 /* Patch Proposal Status */
 patchProposalStatus(proposalId: string, updatedData: NewApprovalStatusUpdate): Observable<Proposal> {
  const url = `${this.updateProposalStatusEndpoint}/${proposalId}`;
  return this.HttpClient.patch<Proposal>(url, updatedData);
}

  /* Patch Claim Status */

  patchClaimApprovalStatus(claimId: string, updatedData: ClaimStatusUpdate): Observable<Claim>{
    const url = `${this.claimApprovalStatusUpdateEndpoint}/${claimId}`;
    return this.HttpClient.patch<Claim>(url, updatedData);




  }


    

}
