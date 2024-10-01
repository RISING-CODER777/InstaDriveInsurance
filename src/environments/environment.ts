export const environment = {
    production: false,

    userProfileEndpoint: 'http://localhost:3000/user-profile',
    proposalsEndpoint: 'http://localhost:3000/proposals',
    userPoliciesEndpoint: 'http://localhost:3000/user-policies',

    claimsApprovalEndpoint: 'http://localhost:3000/claims-approval',
    newApprovalEndpoint: 'http://localhost:3000/new-approval',

    paymentsEndpoint: 'http://localhost:3000/payments',

    insuranceOptionsEndpoint: 'http://localhost:3000/insurance-options',
    insurancePlansEndpoint: 'http://localhost:3000/insurance-plans',

    adminPlansEndpoint :'https://localhost:7246/api/InsurancePlan/add',
    adminOptionsEndpoint :'https://localhost:7246/api/Option/add',

    loginEndpoint:'https://localhost:7246/api/Auth/login',
    userSignUpEndpoint :'https://localhost:7246/api/User/signup',
    forgotPwdEndpoint :'https://localhost:7246/api/Auth/forgot-password',
    resetPwdEndpoint :'https://localhost:7246/api/Auth/reset-password',

    policiesIssuedEndpoint :'https://localhost:7246/api/Policy/GetTotalPoliciesIssued',
    totalPremiumAmountEndpoint :'https://localhost:7246/api/Policy/TotalPremium',
    vehicleSourcesEndpoint : 'https://localhost:7246/api/Policy/GetVehicleSources',
    proposalStatusEndpoint: 'https://localhost:7246/api/Proposal/GetProposalStatusCounts'
};
