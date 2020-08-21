export const SAVE_LOAN_REQUEST_TYPE = 'SAVE_LOAN_REQUEST_TYPE'
export const SAVE_LOAN_REQUEST_ASSET = 'SAVE_LOAN_REQUEST_ASSET'

export function saveLoanRequestType(requestType) {
    return {
        type: SAVE_LOAN_REQUEST_TYPE,
        requestType
    }
}

export function saveLoanRequestAsset(asset) {
    return {
        type: SAVE_LOAN_REQUEST_ASSET,
        asset,
    }
}