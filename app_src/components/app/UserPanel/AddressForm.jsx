import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

// API
import { getAddressesByPostalCode } from '../../../utils/api'

class AddressForm extends Component {

    state = {
        addresses: [],
        postalCode: '',
        postalCodeIsInvalid: false,
        postalCodeErrorMsg: 'Este campo es obligatorio',
        municipality: '',
        municipalityIsInvalid: false,
        municipalityErrorMsg: 'Este campo es obligatorio',
        state: '',
        stateIsInvalid: false,
        suburb: '',
        suburbIsInvalid: false,
        street: '',
        streetIsInvalid: false,
        extNumber: '',
        extNumberIsInvalid: false,
        intNumber: '',
        intNumberIsInvalid: false,
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "Dirección | Precalificador - SwayLending"
        this.setState({
            street: creditRequest.street,
            extNumber: creditRequest.extNumber,
            intNumber: creditRequest.intNumber,
            suburb: creditRequest.suburb,
            municipality: creditRequest.municipality,
            postalCode: creditRequest.postalCode,
            state: creditRequest.state,
            country: creditRequest.country,
        })
    }

    handlePostalCodeChange = (e) => {
        const postalCode = e.target.value

        if (postalCode.length > 5) return

        if (postalCode.length === 5) {
            getAddressesByPostalCode({ postalCode })
                .then(data => data.json())
                .then((res) => {
                    console.log(res)
                    if (res.status === 'OK') {
                        this.setState({
                            municipality: res.payload[0].municipio,
                            state: res.payload[0].estado,
                            addresses: res.payload,
                        })
                    }
                })
        }
        this.setState({ postalCode: e.target.value, postalCodeIsInvalid: e.target.value.length === 5 ? false : true })
    }

    handleSuburbChange = (e) => this.setState({ suburb: e.target.value, suburbIsInvalid: e.target.value.length > 0 ? false : true })
    handleStreetChange = (e) => this.setState({ street: e.target.value, streetIsInvalid: e.target.value.length > 0 ? false : true })
    handleExtNumberChange = (e) => this.setState({ extNumber: e.target.value, extNumberIsInvalid: e.target.value.length > 0 ? false : true })
    handleIntNumberChange = (e) => this.setState({ intNumber: e.target.value })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const {
            postalCode, postalCodeIsInvalid, municipality, municipalityIsInvalid, state, stateIsInvalid,
            suburb, suburbIsInvalid, street, streetIsInvalid, extNumber, extNumberIsInvalid, intNumber, intNumberIsInvalid
        } = this.state

        const { dispatch } = this.props

        if (!postalCode || postalCodeIsInvalid || !municipality || municipalityIsInvalid || !state || stateIsInvalid ||
            !suburb || suburbIsInvalid || !street || streetIsInvalid || !extNumber || extNumberIsInvalid) {
            if (!postalCode || postalCodeIsInvalid) { this.setState({ postalCodeIsInvalid: true }) }
            if (!municipality || municipalityIsInvalid) { this.setState({ municipalityIsInvalid: true }) }
            if (!state || stateIsInvalid) { this.setState({ stateIsInvalid: true }) }
            if (!suburb || suburbIsInvalid) { this.setState({ suburbIsInvalid: true }) }
            if (!street || streetIsInvalid) { this.setState({ streetIsInvalid: true }) }
            if (!extNumber || extNumberIsInvalid) { this.setState({ extNumberIsInvalid: true }) }
            return
        }

        const params = { postalCode, municipality, state, suburb, street, extNumber, intNumber }
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
                    <div className="form-title">¿Cuál es tu dirección?</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-4 ">
                            <input placeholder="Código Postal" value={this.state.postalCode} onChange={this.handlePostalCodeChange} className={this.state.postalCodeIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">{this.state.postalCodeErrorMsg}</div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-4">
                            <input readOnly placeholder="Ciudad" value={this.state.municipality} onChange={this.handleMunicipalityChange} className={this.state.municipalityIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">{this.state.municipalityErrorMsg}</div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-4">
                            <input readOnly placeholder="Estado" value={this.state.state} onChange={this.handleStateChange} className={this.state.stateIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12  ">
                            <select value={this.state.suburb} onChange={this.handleSuburbChange} className={this.state.suburbIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'}>
                                <option value="">Colonia</option>
                                {
                                    this.state.addresses.length > 0 ?
                                        this.state.addresses.map((a) => (
                                            <option key={a.id} value={a.asentamiento}>{a.asentamiento}</option>
                                        ))
                                        : null
                                }
                            </select>
                            <div className="invalid-feedback">Este campo es obligatorio.</div>

                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-12 ">
                            <input placeholder="Calle" value={this.state.street} onChange={this.handleStreetChange} className={this.state.streetIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-6 ">
                            <input placeholder="Número exterior" value={this.state.extNumber} onChange={this.handleExtNumberChange} className={this.state.extNumberIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-6 ">
                            <input placeholder="Número Interior (opcional)" value={this.state.intNumber} onChange={this.handleIntNumberChange} className={this.state.intNumberIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">Este campo es obligatorio.</div>
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

export default connect(mapStateToProps)(AddressForm)
