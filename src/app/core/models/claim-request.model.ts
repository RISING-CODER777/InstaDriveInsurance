export interface ClaimRequest {
    userID: number;
    policyID: number;
    dateOfIncident: Date | string;
    description: string;
    claimType: string;
  }
  