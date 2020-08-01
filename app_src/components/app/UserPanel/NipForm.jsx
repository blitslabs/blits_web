import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class NipForm extends Component {

    state = {
        nip: '',
        nipIsInvalid: false,
        nipErrorMsg: 'Este campo es obligatorio',
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "Ingresar NIP | Precalificador - SwayLending"

        this.setState({ phone: creditRequest.phone, nip: creditRequest.nip })
    }

    handleNIPChange = (e) => {
        const nip = e.target.value
        if (nip.toString().length > 4) {
            return
        } else if (nip.toString().length < 4) {
            this.setState({ nipIsInvalid: true, nipErrorMsg: 'El NIP debe contener 4 dígitos' })
        } else {
            this.setState({ nipIsInvalid: false, nipErrorMsg: 'Este campo es obligatorio' })
        }
        this.setState({ nip })
    }

    handleCheckNIPBtn = (e) => {
        console.log('CHECK_PIN_BTN')
        e.preventDefault()

        const { nip, nipIsInvalid, nipErrorMsg } = this.state
        const { creditRequest, dispatch } = this.props

        if (!nip || nipIsInvalid) {
            if (!nip) this.setState({ nipIsInvalid: true })
            return
        }

        // TO DO: uncomment in production
        // if (creditRequest.creditRequestNIP != nip) {
        //     this.setState({ nipIsInvalid: true, nipErrorMsg: 'El NIP ingresado es incorrecto' })
        //     return
        // }

        dispatch(nextFormController())
        return
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
                    <div className="form-title">Escribe el código que recibiste en tu teléfono</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12">
                            <div className="form-input-desc text-left">Tu número: <span>{this.state.phone}</span></div>
                            <input placeholder="Código" value={this.state.nip} onChange={this.handleNIPChange} className={this.state.nipIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
                            <div className="invalid-feedback">{this.state.nipErrorMsg}</div>
                            <div className="form-label text-left mt-3">Reenviar código</div>

                        </div>
                    </div>

                    <div className="form-group text-center mt-4">
                        <button onClick={this.handleBackBtn} className="btn btn-secondary mr-2">Anterior</button>
                        <button onClick={this.handleCheckNIPBtn} className="btn btn-primary">Siguiente</button>
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

export default connect(mapStateToProps)(NipForm)
