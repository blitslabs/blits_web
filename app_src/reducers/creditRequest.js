import { SAVE_CREDIT_REQUEST, SAVE_CREDIT_REQUEST_ID, SAVE_CREDIT_REQUEST_NIP } from '../actions/creditRequest'

const initialState = {
    email: '',
    phone: '',
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    dateOfBirth: '',
    entidadNacimiento: '',
    gender: '',
    curp: '',
    rfc: '',
    calle: '',
    numeroExt: '',
    colonia: '',
    municipio: '',
    entidadFederativa: '',
    postalCode: '',
    creditType: '',
    creditAmount: '',
    propertyValue: '',
    ownsProperty: '',
    sourceOfResources: '',
    verifiableIncome: '',
    unverifiableIncome: '',
    jobDescription: '',
}

export default function creditRequest(state = initialState, action) {
    switch (action.type) {
        case SAVE_CREDIT_REQUEST:
            return {
                ...state,
                ...action.request,
            }
        case SAVE_CREDIT_REQUEST_ID:
            return {
                ...state,
                creditRequestId: action.creditRequestId
            }
        case SAVE_CREDIT_REQUEST_NIP:
            return {
                ...state,
                creditRequestNIP: action.creditRequestNIP
            }
        default:
            return state
    }
}