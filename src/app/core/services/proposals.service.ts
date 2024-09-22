import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proposal } from '../models/proposal.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProposalsService {
  
  private proposalsEndpoint = environment.proposalsEndpoint;

  constructor(private HttpClient: HttpClient) { }

  getProposalById(proposalId: String): Observable<Proposal> {
    const url = `${this.proposalsEndpoint}?proposalId=${proposalId}`
    return this.HttpClient.get<Proposal>(url);
  }

  updateProposalById(proposalId: String, proposal: Proposal): Observable<Proposal> {
    const url = `${this.proposalsEndpoint}/${proposalId}`
    return this.HttpClient.put<Proposal>(url, proposal);
  }
}
