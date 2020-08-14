import { SAVE_PRE_CREDIT_REQUEST, SAVE_PRE_CREDIT_REQUEST_HASH, SAVE_PRE_CREDIT_REQUEST_NIP } from '../actions/preCreditRequest'

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
        case SAVE_PRE_CREDIT_REQUEST:
            return {
                ...state,
                ...action.request,
            }
        case SAVE_PRE_CREDIT_REQUEST_HASH:
            return {
                ...state,
                creditRequestHash: action.creditRequestHash
            }
        case SAVE_PRE_CREDIT_REQUEST_NIP:
            return {
                ...state,
                creditRequestNIP: action.creditRequestNIP
            }
        default:
            return state
    }
}