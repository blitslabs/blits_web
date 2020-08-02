import { 
    BACK_FORM_CONTROLLER, NEXT_FORM_CONTROLLER, SET_FORM_ID,
    BACK_CREDIT_REQUEST_CONTROLLER, NEXT_CREDIT_REQUEST_CONTROLLER, SET_CREDIT_REQUEST_CONTROLLER,
} from '../actions/formController'

const initialState = { formController: 1, creditRequestController: 1 }

export default function creditRequest(state = initialState, action) {
    switch (action.type) {
        case BACK_FORM_CONTROLLER:
            return {
                formController: state.formController - 1
            }
        case NEXT_FORM_CONTROLLER:
            return {
                formController: state.formController + 1
            }
        case SET_FORM_ID:
            return {
                formController: action.formId
            }
        case BACK_CREDIT_REQUEST_CONTROLLER:
            return {
                creditRequestController: state.creditRequestController - 1
            }
        case NEXT_CREDIT_REQUEST_CONTROLLER:
            return {
                creditRequestController: state.creditRequestController + 1
            }
        case SET_CREDIT_REQUEST_CONTROLLER:
            return {
                creditRequestController: action.formId
            }        
        default:
            return state
    }
}