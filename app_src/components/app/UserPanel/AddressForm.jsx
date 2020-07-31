import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class AddressForm extends Component {

    state = {
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

    handlePostalCodeChange = (e) => this.setState({ postalCode: e.target.value, postalCodeIsInvalid: e.target.value.length > 0 ? false : true })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { rfc, rfcIsInvalid } = this.state
        const { dispatch } = this.props
        
        if (!rfc || rfcIsInvalid) {
            this.setState({ rfcIsInvalid: true })
            return
        }

        const params = { rfc }
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
                        <div className="form-group col-sm-12 col-lg-3 offset-lg-1">
                            <input placeholder="Código Postal" value={this.state.postalCode} onChange={this.handlePostalCodeChange} className={this.state.postalCodeIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">{this.state.postalCodeErrorMsg}</div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-3 offset-lg-1">
                            <input placeholder="Código Postal" value={this.state.postalCode} onChange={this.handlePostalCodeChange} className={this.state.postalCodeIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">{this.state.postalCodeErrorMsg}</div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-10 offset-1 ">
                            <input placeholder="Código Postal" value={this.state.postalCode} onChange={this.handlePostalCodeChange} className={this.state.postalCodeIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                            <div className="invalid-feedback">{this.state.postalCodeErrorMsg}</div>
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
