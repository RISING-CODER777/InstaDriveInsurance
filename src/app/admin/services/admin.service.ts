import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminOptions } from '../models/admin-options.model';
import { AdminPlans } from '../models/admin-plans.model';
import { Claim } from '../models/claim-approval.model';
import { NewApproval } from '../models/new-approval.model';

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


}
