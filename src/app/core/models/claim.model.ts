export interface ClaimRequest {
    claimId: string | undefined;
    claimNumber: string;
    name?: string;
    userId: string; // or string, based on your design
    dateOfIncident: Date | null;
    claimAmount: number;
    approvedAmount: number;
    status: string;
    remarks:string;
    description?: string;
    addOnDetails: any[];
    accidentalCoverDetails: any[];
    accessoryCoverDetails: any[];
  }
  