const API = process.env.API_HOST + '/'


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