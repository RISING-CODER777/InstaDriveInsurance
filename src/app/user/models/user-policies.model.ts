export interface UserPolicies {
    id: number;
    make: string;
    fuelType: string;
    registrationNumber: string;
    year: string;
    status: string;
    isClaimed: boolean;

    // This is only for UI Purpose {Not Required for Backend}
    showDoneButton: boolean | undefined;
}