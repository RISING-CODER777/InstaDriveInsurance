export interface Claim{
  id: string | undefined;
  claimId: string;
  userId: string;
  claimNumber: string;
  name:string;
  dateOfIncident: Date | null;  
  claimAmount:number;
  approvedAmount:number;
  status:string;
  description:string;
  remarks:string;
  addOnDetails : any[],
  accidentCoverDetails: any[],
  accessoryCoverDetails: any[],


}