import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'

// Actions
import { nextFormController, backFormController } from '../../../actions/preFormController'

class NipForm extends Component {
    state = {
        nip: '',
        nipIsInvalid: false,
        nipErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        document.title = "Autorización Círculo de Crédito | SwayLending"
        this.setState({ loading: false })
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

        if (creditRequest.creditRequestNIP != nip) {
            this.setState({ nipIsInvalid: true, nipErrorMsg: 'El NIP ingresado es incorrecto' })
            return
        }

        dispatch(nextFormController())
        return
    }

    render() {

        if(this.state.loading) {
            return <Loading />
        }

        return (
            <Fragment>
                <div className="form-description mt-2">El cliente autoriza a SwayLending la utilización de medios electrónicos de autenticación tales como el NIP.</div>
                <div className="form-description mt-2" style={{ color: 'rgb(0, 0, 128)', fontWeight: '500' }}>Hemos enviado un NIP de 4 dígitos como mensaje de texto (SMS) a tu teléfono celular <span style={{ fontWeight: 'bold' }}>{this.state.phone}</span></div>
                <div className="row mt-2 mb-1">
                    <div className="col-xs-6 offset-xs-3 col-sm-6 offset-sm-3 col-md-6 offset-md-3">
                        <label className="form-label mt-4">NIP<span className="form-required-symbol">*</span></label>
                        <input value={this.state.nip} onChange={this.handleNIPChange} type="number" className={this.state.nipIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                        <div className="invalid-feedback">
                            {this.state.nipErrorMsg}
                        </div>
                    </div>
                </div>
                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="text-center mt-4">
                        <button onClick={this.handleCheckNIPBtn} className="btn btn-light btn-continue">Próxima página</button>
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

export default connect(mapStateToProps)(NipForm)