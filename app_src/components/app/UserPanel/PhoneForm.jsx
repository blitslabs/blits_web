import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class PhoneForm extends Component {

    state = {
        phone: '',
        phoneIsInvalid: false,
        phoneErrorMsg: 'Este campo es obligatorio',
        email: '',
        emailIsInvalid: false,
        emailErrorMsg: 'Este campo es obligatorio',
        acceptTerms: false,
        acceptTermsIsInvalid: false,
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "Datos de contacto | Precalificador - SwayLending"

        this.setState({ phone: creditRequest.phone, email: creditRequest.email })
    }

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

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { phone, phoneIsInvalid, email, emailIsInvalid, acceptTerms, acceptTermsIsInvalid } = this.state
        const { creditRequest, dispatch } = this.props

        const { 
            name, lastName, secondLastName, 
        } = creditRequest

        if (!phone || phoneIsInvalid || !email || emailIsInvalid || !acceptTerms || acceptTermsIsInvalid) {
            if (!phone || phoneIsInvalid) { this.setState({ phoneIsInvalid: true }) }
            if (!email || emailIsInvalid) { this.setState({ emailIsInvalid: true }) }
            if (!acceptTerms || acceptTermsIsInvalid) { this.setState({ acceptTermsIsInvalid: true }) }
            return
        }

        const params = { name, lastName, secondLastName, }
        dispatch(saveCreditRequest(params))
        dispatch(nextFormController())
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
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 text-center">
                    <div className="form-title">¿Cuál es tu número de celular a 10 dígitos?</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12">
                            <input placeholder="Celular" value={this.state.phone} onChange={this.handlePhoneChange} className={this.state.phoneIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
                            <div className="invalid-feedback">{this.state.phoneErrorMsg}</div>
                            <div className="form-input-desc mt-3">Para poder continuar con el proceso te enviaremos un código al número que nos proporciones.</div>
                            <div className="mt-4" style={{ display: 'flex' }}>
                                <input checked={this.state.acceptTerms ? true : false} onClick={() => this.setState({ acceptTerms: !this.state.acceptTerms, acceptTermsIsInvalid: this.state.acceptTerms ? true : false})} style={{ marginTop: '6px', marginRight: '10px', width: '15px', height: '15px' }} type="checkbox" />
                                <div style={{ color: !this.state.acceptTermsIsInvalid ? '#212529' : '#dc3545' }}>Acepto recibir notificaciones por </div>
                                <div style={{ marginTop: '-10px', marginLeft: '5px' }}><img style={{ height: '40px' }} src={process.env.SERVER_HOST + '/app_assets/images/whatsapp_logo.svg'} alt="" /></div>
                            </div>
                        </div>
                    </div>

                    <div className="form-title mt-5">¿A qué correo te enviaremos la información?</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12">
                            <input placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} className={this.state.emailIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
                            <div className="invalid-feedback">{this.state.emailErrorMsg}</div>
                            <div className="form-input-desc mt-3">Al dar clic en Siguiente, acepto que mis datos personales sean tratados para las finalidades descritas en el Aviso de Privacidad, y acepto los Términos y Condiciones de Uso.</div>
                        </div>

                    </div>
                    <div className="form-group text-center mt-4">
                        <button onClick={this.handleBackBtn} className="btn btn-secondary mr-2">Anterior</button>
                        <button onClick={this.handleContinueBtn} className="btn btn-primary">Siguiente</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth, formController, creditRequest }) {
    return {
        token: auth && auth.token,
        creditRequest,
        formController: 'formController' in formController ? formController.formController : 1,
    }
}

export default connect(mapStateToProps)(PhoneForm)
