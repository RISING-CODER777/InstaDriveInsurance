export const environment = {
    production: false,

    userProfileEndpoint: 'https://localhost:7141/api/UserProfile',
    proposalsEndpoint: 'http://localhost:3000/proposals',
    userPoliciesEndpoint: 'https://localhost:7141/api/UserPolicies',

    claimsApprovalEndpoint: 'https://localhost:7141/api/Claims/all',
    newApprovalEndpoint: 'https://localhost:7141/api/admin/Proposal/AllProposals',

    paymentsEndpoint: 'http://localhost:3000/payments',

    insuranceOptionsEndpoint: 'http://localhost:3000/insurance-options',

    vehicleEndpoint:'https://localhost:7141/api/Vehicle',
    updateProposalStatusEndpoint: 'https://localhost:7141/api/admin/Proposal',

    userProposalsEndpoint:'https://localhost:7141/api/UserProposalStatus/proposal',

    insurancePlansEndpoint: 'https://localhost:7141/api/InsurancePlan',

    calculatePremiumEndpoint: 'https://localhost:7141/api/PremiumApproximation/calculate',

    claimApprovalStatusUpdateEndpoint: 'https://localhost:7141/api/Claims/update-details'
    adminPlansEndpoint :'https://localhost:7246/api/InsurancePlan/add',
    adminOptionsEndpoint :'https://localhost:7246/api/Option/add',

    loginEndpoint:'https://localhost:7246/api/Auth/login',
    userSignUpEndpoint :'https://localhost:7246/api/User/signup',

    policiesIssuedEndpoint :'https://localhost:7246/api/Policy/GetTotalPoliciesIssued',
    totalPremiumAmountEndpoint :'https://localhost:7246/api/Policy/TotalPremium',
    vehicleSourcesEndpoint : 'https://localhost:7246/api/Policy/GetVehicleSources',
    proposalStatusEndpoint: 'https://localhost:7246/api/Proposal/GetProposalStatusCounts'
};
