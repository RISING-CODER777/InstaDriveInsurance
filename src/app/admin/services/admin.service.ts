import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminOptions } from '../models/admin-options.model';
import { AdminPlans } from '../models/admin-plans.model';
import { Claim } from '../models/claim-approval.model';
import { NewApproval } from '../models/new-approval.model';
import { NewApprovalStatusUpdate } from '../models/new-approval-status-update.model';
import { ClaimStatusUpdate } from '../models/claim-status-update.model';
import { Proposal } from 'src/app/core/models/proposal.model';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private policiesIssuedEndpoint = environment.policiesIssuedEndpoint;

  private newApprovalEndpoint = environment.newApprovalEndpoint;
  private claimsApprovalEndpoint = environment.claimsApprovalEndpoint;
  private adminPlansEndpoint = environment.adminPlansEndpoint;
  private adminOptionsEndpoint = environment.adminOptionsEndpoint;
  private totalPremiumAmountEndpoint = environment.totalPremiumAmountEndpoint;
  private vehicleSourcesEndpoint = environment.vehicleSourcesEndpoint;
  private proposalStatusEndpoint = environment.proposalStatusEndpoint;
  private updateProposalStatusEndpoint = environment.updateProposalStatusEndpoint;
  private claimApprovalStatusUpdateEndpoint = environment.claimApprovalStatusUpdateEndpoint; // Add this endpoint for updating claim approval


  constructor(private HttpClient: HttpClient) { }

  /* Dashboard */
  /* Policies Issued */
  getTotalPoliciesIssued(): Observable<any> {
    return this.HttpClient.get(this.policiesIssuedEndpoint);
  }

  /* Total Premium */
  getTotalActivePremium(): Observable<number> {
    return this.HttpClient.get<number>(this.totalPremiumAmountEndpoint);
  }

  /* Vehicle Sources */
  getVehicleSources(): Observable<any[]> {
    return this.HttpClient.get<any[]>(this.vehicleSourcesEndpoint);
  }

  /* Proposal Status */
  getProposalStatusCounts(): Observable<any[]> {
    return this.HttpClient.get<any[]>(this.proposalStatusEndpoint);
  }


  /* New Approval */
  getNewApproval(): Observable<NewApproval[]> {
    console.log(this.HttpClient.get<NewApproval[]>(this.newApprovalEndpoint));

    return this.HttpClient.get<NewApproval[]>(this.newApprovalEndpoint);
  }


  /* Claims Approval */
  getClaims(): Observable<Claim[]>{
    return this.HttpClient.get<Claim[]>(this.claimsApprovalEndpoint);
  }

  /* Add Plan */
  addPlan(adminPlan: AdminPlans): Observable<AdminPlans> {
    return this.HttpClient.post<AdminPlans>(`${this.adminPlansEndpoint}`, adminPlan);
  }

  /* Add Plan */
  addOption(adminOption: AdminOptions): Observable<AdminOptions> {
    return this.HttpClient.post<AdminOptions>(`${this.adminOptionsEndpoint}`, adminOption);
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
