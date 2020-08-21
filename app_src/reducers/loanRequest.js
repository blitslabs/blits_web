import {
    SAVE_LOAN_REQUEST_TYPE, SAVE_LOAN_REQUEST_ASSET
} from '../actions/loanRequest'

const initialState = {
    requestType: '',
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
        default:
            return state
    }
}