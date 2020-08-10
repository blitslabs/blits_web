export const BACK_PRECALIFICADOR_CONTROLLER = 'BACK_PRECALIFICADOR_CONTROLLER'
export const NEXT_PRECALIFICADOR_CONTROLLER = 'NEXT_PRECALIFICADOR_CONTROLLER'
export const SET_PRECALIFICADOR_FORM_ID = 'SET_PRECALIFICADOR_FORM_ID'

export function nextFormController() {
    return {
        type: NEXT_PRECALIFICADOR_CONTROLLER,
    }
}

export function backFormController() {
    return {
        type: BACK_PRECALIFICADOR_CONTROLLER
    }
}

export function setFormID(formId) {
    return {
        type: SET_PRECALIFICADOR_FORM_ID,
        formId,
    }
}
