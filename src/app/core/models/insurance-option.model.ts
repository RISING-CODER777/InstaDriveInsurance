export interface InsuranceOption {
    optionType: string;
    optionName: string;
    description: string;
    price: number;
    coverageAmount: number;
    selected?: boolean; // Optional property for selected state
  }
  