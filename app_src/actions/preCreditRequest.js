export const SAVE_PRE_CREDIT_REQUEST = 'SAVE_PRE_CREDIT_REQUEST'
export const SAVE_PRE_CREDIT_REQUEST_HASH = 'SAVE_PRE_CREDIT_REQUEST_HASH'
export const SAVE_PRE_CREDIT_REQUEST_NIP = 'SAVE_PRE_CREDIT_REQUEST_NIP'

export function saveCreditRequest(request) {
    return {
        type: SAVE_PRE_CREDIT_REQUEST,
        request,
    }
}

export function saveCreditRequestHash(creditRequestHash) {
    return {
        type: SAVE_PRE_CREDIT_REQUEST_HASH,
        creditRequestHash,
    }
}

export function saveCreditRequestNIP(creditRequestNIP) {
    return {
        type: SAVE_PRE_CREDIT_REQUEST_NIP,
        creditRequestNIP,
    }
}