export const BACK_FORM_CONTROLLER = 'BACK_FORM_CONTROLLER'
export const NEXT_FORM_CONTROLLER = 'NEXT_FORM_CONTROLLER'
export const SET_FORM_ID = 'SET_FORM_ID'

export const BACK_CREDIT_REQUEST_CONTROLLER = 'BACK_CREDIT_REQUEST_CONTROLLER'
export const NEXT_CREDIT_REQUEST_CONTROLLER = 'NEXT_CREDIT_REQUEST_CONTROLLER'
export const SET_CREDIT_REQUEST_CONTROLLER = 'SET_CREDIT_REQUEST_CONTROLLER'


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

export function nextCreditRequestController() {
    return {
        type: NEXT_CREDIT_REQUEST_CONTROLLER,
    }
}

export function backCreditRequestController() {
    return {
        type: BACK_CREDIT_REQUEST_CONTROLLER
    }
}

export function setCreditRequestController(formId) {
    return {
        type: SET_CREDIT_REQUEST_CONTROLLER,
        formId,
    }
}

