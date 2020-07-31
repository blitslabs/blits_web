import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ClientRFCForm extends Component {

    state = {
        rfc: '',
        rfcIsInvalid: false,
        rfcErrorMsg: 'Este campo es obligatorio'
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "RFC | Precalificador - SwayLending"
        this.setState({ rfc: creditRequest.rfc })
    }

    handleRFCChange = (e) => this.setState({ rfc: e.target.value, rfcIsInvalid: e.target.value.length > 0 ? false : true })

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
                    <div className="form-title">¿Cuál es tu RFC?</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-10 offset-lg-1">
                            <div className="input-prefix">RFC</div>
                            <input value={this.state.rfc} onChange={this.handleRFCChange} className={this.state.rfcIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
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

export default connect(mapStateToProps)(ClientRFCForm)
