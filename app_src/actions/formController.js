export const BACK_FORM_CONTROLLER = 'BACK_FORM_CONTROLLER'
export const NEXT_FORM_CONTROLLER = 'NEXT_FORM_CONTROLLER'
export const SET_FORM_ID = 'SET_FORM_ID'

export function nextFormController() {
    return {
        type: NEXT_FORM_CONTROLLER,
    }
}

export function backFormController() {
    return {
        type: BACK_FORM_CONTROLLER
    }
}

export function setFormID(formId) {
    return {
        type: SET_FORM_ID,
        formId,
    }
}