const API = process.env.API_HOST + '/'

// Precalificador
export function createCreditRequest(params) {
    return fetch(API + 'create_credit_request', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function checkCreditRequestNIP(params) {
    return fetch(API + 'check_nip', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export function login(params) {
    return fetch(API + 'admin/login', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export function getAdminData(params) {
    return fetch(API + 'admin/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function checkAdminAuth(params) {
    return fetch(API + 'admin/checkPrivileges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAllUsersByType(params) {
    return fetch(API + `admin/getAllUsersByTypeAndPage/${params.accountType}/${params.page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + params.token
        }
    })
}

export function getAddressesByPostalCode(params) {
    return fetch(API + `sepomex/getAddresses/${params.postalCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}