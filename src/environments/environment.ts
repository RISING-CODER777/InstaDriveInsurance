export const environment = {
  firebase: {
    projectId: 'instadrive-dfd72',
    appId: '1:1063881640641:web:24f493cbc892d23444e240',
    storageBucket: 'instadrive-dfd72.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyBvoeh3QUb2ZvxA3HZ6uxbTQMn3D1nNoxw',
    authDomain: 'instadrive-dfd72.firebaseapp.com',
    messagingSenderId: '1063881640641',
    measurementId: 'G-EZ27YVMSY0',
  },
    production: false,

    userProfileEndpoint: 'https://localhost:7141/api/UserProfile',
    proposalsEndpoint: 'http://localhost:3000/proposals',
    userPoliciesEndpoint: 'https://localhost:7141/api/UserPolicies',

    claimsApprovalEndpoint: 'https://localhost:7141/api/Claims/all',
    newApprovalEndpoint: 'https://localhost:7141/api/admin/Proposal/AllProposals',

    paymentsEndpoint: 'http://localhost:3000/payments',

    insuranceOptionsEndpoint: 'https://localhost:7141/api/Options',

    vehicleEndpoint: 'https://localhost:7141/api/Vehicle',
    updateProposalStatusEndpoint: 'https://localhost:7141/api/admin/Proposal',

    userProposalsEndpoint: 'https://localhost:7141/api/UserProposalStatus/proposal',

    insurancePlansEndpoint: 'https://localhost:7141/api/InsurancePlan',

    calculatePremiumEndpoint: 'https://localhost:7141/api/PremiumApproximation/calculate',

    claimApprovalStatusUpdateEndpoint: 'https://localhost:7141/api/Claims/update-details',
    adminPlansEndpoint :'https://localhost:7246/api/InsurancePlan/add',
    adminOptionsEndpoint :'https://localhost:7141/api/Options',

    loginEndpoint:'https://localhost:7141/api/Auth/login',
    userSignUpEndpoint :'https://localhost:7141/api/User',
    forgotPwdEndpoint :'https://localhost:7141/api/Auth/forgot-password',
    resetPwdEndpoint :'https://localhost:7141/api/Auth/reset-password',

    policiesIssuedEndpoint: 'https://localhost:7246/api/Policy/GetTotalPoliciesIssued',
    totalPremiumAmountEndpoint: 'https://localhost:7246/api/Policy/TotalPremium',
    vehicleSourcesEndpoint: 'https://localhost:7246/api/Policy/GetVehicleSources',
    proposalStatusEndpoint: 'https://localhost:7246/api/Proposal/GetProposalStatusCounts',

    claimRequestEndpoint: 'https://localhost:7141/api/Claim',

    premiumProposalCoverageEndpoint: 'https://localhost:7141/api/Proposals',

    insuranceOptionSelectionEndpoint: 'https://localhost:7141/api/ProposalOptions',

    firebaseConfig: {
        apiKey: "AIzaSyBvoeh3QUb2ZvxA3HZ6uxbTQMn3D1nNoxw",
        authDomain: "instadrive-dfd72.firebaseapp.com",
        projectId: "instadrive-dfd72",
        storageBucket: "instadrive-dfd72.appspot.com",
        messagingSenderId: "1063881640641",
        appId: "1:1063881640641:web:24f493cbc892d23444e240",
        measurementId: "G-EZ27YVMSY0"
    },

    insuranceAmountEndpoint:'https://localhost:7141/api/Payment/InsuranceAmount',

    paymentEndpoint :'https://localhost:7141/api/Payment',

    updateUserProfileEndpoint :'https://localhost:7141/api/UserProfile/update',


    userAvatarEndpoint:'https://localhost:7141/api/UserProfile/avatar',
};
