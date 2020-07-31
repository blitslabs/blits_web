import { BACK_FORM_CONTROLLER, NEXT_FORM_CONTROLLER, SET_FORM_ID } from '../actions/formController'

const initialState = { formController: 1 }

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
        default:
            return state
    }
}