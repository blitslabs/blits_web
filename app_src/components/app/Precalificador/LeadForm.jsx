import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, saveCreditRequestId, saveCreditRequestNIP } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

// API
import { createCreditRequest } from '../../../utils/api'

class LeadForm extends Component {

    state = {
        email: '',
        phone: '',
        confirmPhone: '',
        emailIsInvalid: false,
        phoneIsInvalid: false,
        confirmPhoneIsInvalid: false,
        emailErrorMsg: 'Este campo es obligatorio.',
        phoneErrorMsg: 'Este campo es obligatorio.',
        confirmPhoneErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { email, phone } = creditRequest
        this.setState({
            email,
            phone,
            loading: false
        })
    }

    /* PART_1 */
    handleEmailChange = (e) => {

        if (!this.validateEmail(e.target.value)) {
            this.setState({ emailIsInvalid: true, emailErrorMsg: 'Ingresa un correo electrónico válido' })
        } else {
            this.setState({ emailIsInvalid: false, emailErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ email: e.target.value })
    }

    handlePhoneChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10) {
            this.setState({ phoneIsInvalid: true, phoneErrorMsg: 'La entrada debe contener 10 caracteres' })
        } else {
            this.setState({ phoneIsInvalid: false, phoneErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ phone: e.target.value })
    }

    handleConfirmPhoneChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10 || phone != this.state.phone) {
            this.setState({ confirmPhoneIsInvalid: true, confirmPhoneErrorMsg: 'Confirmar Teléfono. Los campos deben ser idénticos' })
        } else {
            this.setState({ confirmPhoneIsInvalid: false, confirmPhoneErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ confirmPhone: e.target.value })
    }

    handleSendNIPBtn = (e) => {
        e.preventDefault()

        const { creditRequest, dispatch } = this.props

        const {
            firstName, secondName, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento,
            curp, rfc,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode,
            creditType, creditAmount, propertyValue, ownsProperty,
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription,
        } = creditRequest

        const {
            email, phone, confirmPhone, emailIsInvalid, phoneIsInvalid, confirmPhoneIsInvalid
        } = this.state

        if (!email || !phone || !confirmPhone || emailIsInvalid || phoneIsInvalid || confirmPhoneIsInvalid) {
            if (!email) this.setState({ emailIsInvalid: true })
            if (!phone) this.setState({ phoneIsInvalid: true })
            if (!confirmPhone) this.setState({ confirmPhoneIsInvalid: true })
            return
        }

        // Save Credit Request
        const params = {
            email, phone, firstName, secondName, lastName, secondLastName, dateOfBirth: dateOfBirth.toString(), gender,
            entidadNacimiento, curp, rfc,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode, creditType, creditAmount, propertyValue, ownsProperty,
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription,
        }

        dispatch(saveCreditRequest(params))

        // API
        createCreditRequest(params)
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    dispatch(saveCreditRequestId(res.payload.credit_request_id))
                    dispatch(saveCreditRequestNIP(res.payload.nip))
                    // next form controller
                    dispatch(nextFormController())
                    return
                }
            })
            .catch((err) => {
                console.log(err)
                return
            })
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {

        return (
            <Fragment>
               
                <div className="form-group mt-4">
                    <label className="form-label">Email<span className="form-required-symbol">*</span></label>
                    <input value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.emailErrorMsg}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Teléfono<span className="form-required-symbol">*</span></label>
                    <input value={this.state.phone} onChange={this.handlePhoneChange} maxLength="10" type="number" className={this.state.phoneIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.phoneErrorMsg}
                    </div>
                </div>
                {
                    this.state.phone.length > 0 && (
                        <div className="form-group">
                            <label className="form-label">Confirmar Teléfono<span className="form-required-symbol">*</span></label>
                            <input value={this.state.confirmPhone} onChange={this.handleConfirmPhoneChange} maxLength="10" type="number" className={this.state.confirmPhoneIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                            <div className="invalid-feedback">
                                {this.state.confirmPhoneErrorMsg}
                            </div>
                        </div>
                    )
                }
                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                        <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={this.handleSendNIPBtn} className="btn btn-light btn-continue">Próxima página</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps({ preCreditRequest }) {
    return {
        creditRequest: preCreditRequest,
    }
}

export default connect(mapStateToProps)(LeadForm)