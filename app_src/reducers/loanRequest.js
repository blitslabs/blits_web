import {
    SAVE_LOAN_REQUEST_TYPE, SAVE_LOAN_REQUEST_ASSET, SAVE_LOAN_REQUEST_TERMS,
    SAVE_SECRET_HASH_B1,
} from '../actions/loanRequest'

const initialState = {
    requestType: '',
    secretHashB1: ''
}

export default function creditRequest(state = initialState, action) {
    switch (action.type) {
        case SAVE_LOAN_REQUEST_TYPE:
            return {
                ...state,
                requestType: action.requestType,
            }
        case SAVE_LOAN_REQUEST_ASSET:
            return {
                ...state,
                asset: action.asset,
            }
        case SAVE_LOAN_REQUEST_TERMS:
            return {
                ...state,
                ...action.loanTerms
            }
        case SAVE_SECRET_HASH_B1:
            return {
                ...state,
                secretHashB1: action.secretHashB1,
            }
        default:
            return state
    }
}