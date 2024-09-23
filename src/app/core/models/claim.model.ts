export interface ClaimRequest {
    claimNumber: string;
    name?: string;
    userId: number; // or string, based on your design
    dateOfIncident: string;
    claimAmount: number;
    approvedAmount: number;
    status: string;
    description?: string;
    addOnDetails: any[];
    accidentalCoverDetails: any[];
    accessoryCoverDetails: any[];
  }
  