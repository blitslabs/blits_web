import { SAVE_ACCOUNT_LOANS, SAVE_ACCOUNT_COLLATERAL_TXS } from '../actions/accountLoans'

const initialState = {
    loans: {},
    collateralTxs: {}
}

export default function accountLoans(state = initialState, action) {
    switch (action.type) {
        case SAVE_ACCOUNT_LOANS:
            return {
                ...state,
                loans: {
                    ...action.loans
                },
            }

        case SAVE_ACCOUNT_COLLATERAL_TXS:
            return {
                ...state,
                collateralTxs: {
                    ...action.collateralTxs
                }
            }

        default:
            return state
    }
}