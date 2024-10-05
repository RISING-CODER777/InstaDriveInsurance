export interface Admin {
    userID?: number;
    username: string;
    passwordHash?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth?: Date;
    address: string;
    aadharNumber?: string;
    panNumber?: string;
    role: string;
  }