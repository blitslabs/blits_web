export const SAVE_ACCOUNT_LOANS = 'SAVE_ACCOUNT_LOANS'
export const SAVE_ACCOUNT_COLLATERAL_TXS = 'SAVE_ACCOUNT_COLLATERAL_TXS'

export function saveAccountLoans(loans) {
    return {
        type: SAVE_ACCOUNT_LOANS,
        loans
    }
}

export function saveAccountCollateral(collateralTxs) {
    return {
        type: SAVE_ACCOUNT_COLLATERAL_TXS,
        collateralTxs
    }
}