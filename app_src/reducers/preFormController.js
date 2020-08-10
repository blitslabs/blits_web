import { 
    BACK_PRECALIFICADOR_CONTROLLER, NEXT_PRECALIFICADOR_CONTROLLER, SET_PRECALIFICADOR_FORM_ID,
   
} from '../actions/preFormController'

const initialState = { formController: 1 }

export default function creditRequest(state = initialState, action) {
    switch (action.type) {
        case BACK_PRECALIFICADOR_CONTROLLER:
            return {
                formController: state.formController - 1
            }
        case NEXT_PRECALIFICADOR_CONTROLLER:
            return {
                formController: state.formController + 1
            }
        case SET_PRECALIFICADOR_FORM_ID:
            return {
                formController: action.formId
            }               
        default:
            return state
    }
}