import { SET_PROVIDER_STATUS } from '../actions/shared'

export default function shared(state = {}, action) {
    switch (action.type) {
        case SET_PROVIDER_STATUS:
            return {
                ...state,
                [action.providerStatus.name]: action.providerStatus.status
            }
        default:
            return state
    }
}