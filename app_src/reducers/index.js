import { combineReducers } from 'redux'
import loading from './loading'
import preFormController from './preFormController'
import formController from './formController'
import preCreditRequest from './preCreditRequest'
import creditRequest from './creditRequest'
import auth from './auth'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
    preFormController,
    formController,
    preCreditRequest,
    creditRequest,
    loading,
    auth,
})

const rootReducer = (state, action) => {
    if (action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer