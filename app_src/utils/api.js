const API = process.env.API_HOST + '/'
const API_WALLET = process.env.API_WALLET

export function subscribeEmail(params) {
    return fetch(API + 'newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getAssets(params) {
    return fetch(API + 'assets', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function saveLoan(params) {
    return fetch(API + 'loan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

export function getContractABI(params) {
    return fetch(API + 'contract/abi/' + params.contractName, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function saveExtLoanId(params) {
    return fetch(API + 'loan/saveExtLoanId', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

export function updateLoanState(params) {
    return fetch(API + 'loan/updateLoanState', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

export function getAccountLoans(params) {
    return fetch(API + `loans/${params.account}/${params.userType}/${params.loanState}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getContractsData() {
    return fetch(API + `contracts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getLoansByStatus(params) {
    return fetch(API + `loans/${params.status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getLoanDetails(params) {
    return fetch(API + `loan/${params.loanId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function saveBorrowerRequest(params) {
    return fetch(API + 'loan/saveBorrower', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
}

export function assignBorrower(params) {
    return fetch(API + 'loan/approve/' + params.loanId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function acceptRepayment(params) {
    return fetch(API + 'loan/acceptRepayment/' + params.loanId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

// CROSS-CHAIN LOANS
export function getAvailableLoans() {
    return fetch(API_WALLET + 'loans/available', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getLoanAssets(params) {
    return fetch(API_WALLET + `loans/assets/${params.operation}/${params.network}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getLoansSettings(params) {
    return fetch(API_WALLET + 'loans/settings/' + params.network, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}