export interface NewApproval {
    id: string | undefined;
    name: string;
    userId: string;
    proposalId: string;
    policyDetails: string;
    status: string;
    requestDate: Date;
    premiumAmount: number;
    adminComments: string;
    addOnDetails: string[]; 
    accidentCoverDetails: string[]; 
    accessoryCoverDetails: string[]; 
    isRenewable: boolean;
}