import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ConfirmNipForm extends Component {

    state = {
        confirmNIP: '',
        acceptTerms: false,
        confirmNIPIsInvalid: false,
        acceptTermsIsInvalid: false,
        confirmNIPErrorMsg: 'Este campos es obligatorio.',
        loading: true,
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "Autorización Buro de Crédito | Precalificador - SwayLending"

        this.setState({ loading: false })
    }

    handleConfirmNIPChange = (e) => {
        const nip = e.target.value
        if (nip.toString().length > 4) {
            return
        } else if (nip.toString().length < 4) {
            this.setState({ confirmNIPIsInvalid: true, confirmNIPErrorMsg: 'El NIP debe contener 4 dígitos' })
        } else {
            this.setState({ confirmNIPIsInvalid: false, confirmNIPErrorMsg: 'Este campo es obligatorio' })
        }
        this.setState({ confirmNIP: nip })
    }

    handleSubmitBtn = (e) => {
        console.log('CONFIRM_NIP_BTN')
        e.preventDefault()
        const { confirmNIP, confirmNIPIsInvalid, acceptTerms, acceptTermsIsInvalid } = this.state
        const { dispatch } = this.props

        if (!confirmNIP || confirmNIPIsInvalid || !acceptTerms || acceptTermsIsInvalid) {
            if (!confirmNIP) this.setState({ confirmNIPIsInvalid: true })
            if (!acceptTerms) this.setState({ acceptTermsIsInvalid: true })
            return
        }

        const params = {}
        dispatch(saveCreditRequest(params))
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {


        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 text-center">
                    <div className="form-title">Autorización de buró de crédito</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12">

                            <div className="mt-2" style={{ display: 'flex' }}>
                                <input checked={this.state.acceptTerms ? true : false} onClick={() => this.setState({ acceptTerms: !this.state.acceptTerms, acceptTermsIsInvalid: this.state.acceptTerms ? true : false })} style={{ marginTop: '6px', marginRight: '10px', width: '30px', height: '30px' }} type="checkbox" />
                                <div style={{ color: !this.state.acceptTermsIsInvalid ? '#212529' : '#dc3545', textAlign: 'justify' }}>Autorizo a Sway Compass SAPI de CV a consultar el historial crediticio de cualquier SIC que estime conveniente.</div>
                            </div>
                        </div>
                    </div>

                    <div className="form-title mt-5">Ingresa nuevamente tu código</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12">
                            <input placeholder="Código" value={this.state.confirmNIP} onChange={this.handleConfirmNIPChange} className={this.state.confirmNIPIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
                            <div className="invalid-feedback">{this.state.confirmNIPErrorMsg}</div>
                            <div className="form-label text-left mt-3">Reenviar código</div>
                        </div>

                    </div>
                    <div className="form-group text-center mt-5">
                        <button onClick={this.handleBackBtn} className="btn btn-secondary mr-2">Anterior</button>
                        <button onClick={this.handleSubmitBtn} className="btn btn-primary">Siguiente</button>
                    </div>
                </div>
                <div className="col-md-3 text-center mt-4 ">
                    <div style={{ color: '#007888', fontFamily: 'Avenir', fontWeight: 700 }}>¿Por qué consultamos tu historial crediticio?</div>
                    <div style={{ color: '#A9A9A9', fontFamily: 'Avenir' }}>Al consultar tu buró y considerantu tus deudas mensuales, podemos evaluar tu caso con más precisión y calcular tu línea de crédito máxima. Recibirás un reporte de tu historial y te daresmo consejos para mejorar tu estado crediticio.</div>
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

export default connect(mapStateToProps)(ConfirmNipForm)
