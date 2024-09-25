export interface NewApproval {
    id: string | undefined;
    name: string;
    userId: string;
    proposalId: string;
    proposalNumber: string; // Added proposalNumber property
    policyDetails: string;
    status: string;
    requestDate: Date | null;
    premiumAmount: number;
    adminComments: string;
    addOnDetails: string[];
    accidentCoverDetails: string[];
    accessoryCoverDetails: string[];
    isRenewable: boolean;
}
