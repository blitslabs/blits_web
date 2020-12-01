import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import loading from './loading'
import loanRequest from './loanRequest'
import auth from './auth'
import availableLoans from './availableLoans'
import loanSettings from './loanSettings'
import loanAssets from './loanAssets'
import lendRequest from './lendRequest'
import prices from './prices'
import loanDetails from './loanDetails'
import shared from './shared'

const appReducer = combineReducers({
    loanRequest,
    loading,
    auth,
    availableLoans,
    loanSettings,
    loanAssets,
    lendRequest,
    prices,
    loanDetails,
    shared
})

const rootReducer = (state, action) => {
    if (action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer