import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AdminOptions } from '../models/admin-options.model';
import { AdminPlans } from '../models/admin-plans.model';
import { Claim } from '../models/claim-approval.model';
import { NewApproval } from '../models/new-approval.model';
import { NewApprovalStatusUpdate } from '../models/new-approval-status-update.model';
import { ClaimStatusUpdate } from '../models/claim-status-update.model';
import { Proposal } from 'src/app/core/models/proposal.model';
import { Admin } from '../models/admin-model';

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
  private claimApprovalStatusUpdateEndpoint = environment.claimApprovalStatusUpdateEndpoint; 
  private adminEndpoint = environment.adminEndpoint;

  // Step 1: Create BehaviorSubjects for each data stream
  private newApprovalSubject = new BehaviorSubject<NewApproval[]>([]);
  private claimSubject = new BehaviorSubject<Claim[]>([]);
  private proposalStatusCountsSubject = new BehaviorSubject<any[]>([]);

  constructor(private httpClient: HttpClient) {}

  /* Dashboard */

  /* Policies Issued */
  getTotalPoliciesIssued(): Observable<any> {
    return this.httpClient.get(this.policiesIssuedEndpoint);
  }

  /* Total Premium */
  getTotalActivePremium(): Observable<number> {
    return this.httpClient.get<number>(this.totalPremiumAmountEndpoint);
  }

  /* Vehicle Sources */
  getVehicleSources(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.vehicleSourcesEndpoint);
  }

  /* Proposal Status */

  // Step 2: Expose observable to components for proposal status counts
  getProposalStatusCountsObservable(): Observable<any[]> {
    return this.proposalStatusCountsSubject.asObservable();
  }

  // Fetch and update BehaviorSubject for Proposal Status
  getProposalStatusCounts(): void {
    this.httpClient.get<any[]>(this.proposalStatusEndpoint).pipe(
      tap((data: any[]) => {
        this.proposalStatusCountsSubject.next(data); // Emit new data
      })
    ).subscribe();
  }

  /* New Approval */

  // Step 3: Expose observable for new approvals
  getNewApprovalObservable(): Observable<NewApproval[]> {
    return this.newApprovalSubject.asObservable();
  }

  // Fetch and update BehaviorSubject for New Approvals
  getNewApproval(): void {
    this.httpClient.get<NewApproval[]>(this.newApprovalEndpoint).pipe(
      tap((data: NewApproval[]) => {
        this.newApprovalSubject.next(data); // Emit new data
      })
    ).subscribe();
  }

  /* Claims Approval */

  // Step 4: Expose observable for claim approvals
  getClaimsObservable(): Observable<Claim[]> {
    return this.claimSubject.asObservable();
  }

  // Fetch and update BehaviorSubject for Claims
  getClaims(): void {
    this.httpClient.get<Claim[]>(this.claimsApprovalEndpoint).pipe(
      tap((data: Claim[]) => {
        this.claimSubject.next(data); // Emit new data
      })
    ).subscribe();
  }

  /* Add Plan */
  addPlan(adminPlan: AdminPlans): Observable<AdminPlans> {
    return this.httpClient.post<AdminPlans>(`${this.adminPlansEndpoint}`, adminPlan);
  }

  /* Add Option */
  addOption(adminOption: AdminOptions): Observable<AdminOptions> {
    return this.httpClient.post<AdminOptions>(`${this.adminOptionsEndpoint}`, adminOption);
  }

  /* Patch Proposal Status */
  patchProposalStatus(proposalId: string, updatedData: NewApprovalStatusUpdate): Observable<Proposal> {
    const url = `${this.updateProposalStatusEndpoint}/${proposalId}`;
    return this.httpClient.patch<Proposal>(url, updatedData).pipe(
      tap(() => {
        this.getNewApproval(); // Refetch new approval data after patching
      })
    );
  }

  /* Patch Claim Status */
  patchClaimApprovalStatus(claimId: string, updatedData: ClaimStatusUpdate): Observable<Claim> {
    const url = `${this.claimApprovalStatusUpdateEndpoint}/${claimId}`;
    return this.httpClient.patch<Claim>(url, updatedData).pipe(
      tap(() => {
        this.getClaims(); // Refetch claims data after patching
      })
    );
  }

  /* Admin Management */

  // Get all admins
  getAllAdmins(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(this.adminEndpoint);
  }

  // Get an admin by ID
  getAdminById(id: number): Observable<Admin> {
    return this.httpClient.get<Admin>(`${this.adminEndpoint}/${id}`);
  }

  // Update an admin
  updateAdmin(id: number, admin: Admin): Observable<void> {
    return this.httpClient.put<void>(`${this.adminEndpoint}/${id}`, admin);
  }

  // Delete an admin
  deleteAdmin(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.adminEndpoint}/${id}`);
  }

  // Add a new admin (No userID as it will be generated by backend)
  addAdmin(admin: Omit<Admin, 'userID'>): Observable<Admin> {
    return this.httpClient.post<Admin>(this.adminEndpoint, admin);
  }
}
