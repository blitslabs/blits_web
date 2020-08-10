export const SAVE_PRE_CREDIT_REQUEST = 'SAVE_PRE_CREDIT_REQUEST'
export const SAVE_PRE_CREDIT_REQUEST_ID = 'SAVE_PRE_CREDIT_REQUEST_ID'
export const SAVE_PRE_CREDIT_REQUEST_NIP = 'SAVE_PRE_CREDIT_REQUEST_NIP'

export function saveCreditRequest(request) {
    return {
        type: SAVE_PRE_CREDIT_REQUEST,
        request,
    }
}

export function saveCreditRequestId(creditRequestId) {
    return {
        type: SAVE_PRE_CREDIT_REQUEST_ID,
        creditRequestId,
    }
}

export function saveCreditRequestNIP(creditRequestNIP) {
    return {
        type: SAVE_PRE_CREDIT_REQUEST_NIP,
        creditRequestNIP,
    }
}