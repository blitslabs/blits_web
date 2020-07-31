import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController } from '../../../actions/formController'

class CreditTypeForm extends Component {

    state = {
        creditType: '',
        creditTypeIsInvalid: false,
        creditType: ''

    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Precalificador"


    }

    handleCreditTypeChange = (e) => this.setState({ creditType: e.target.value, creditTypeIsInvalid: e.target.value.length > 0 ? false : true })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { creditType, creditTypeIsInvalid } = this.state
        const { dispatch } = this.props

        if (!creditType || creditTypeIsInvalid) {
            this.setState({ creditTypeIsInvalid: true })
            return
        }

        const params = { creditType }
        dispatch(saveCreditRequest(params))
        dispatch(nextFormController())
    }

    render() {


        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
                    <div className="form-group">
                        <label className="form-label">Tipo de crédito<span className="form-required-symbol">*</span></label>
                        <select value={this.state.creditType} onChange={this.handleCreditTypeChange} className={this.state.creditTypeIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                            <option value="">Seleccionar</option>
                            <option value="Adquisición Tradicional">Adquisición Tradicional</option>
                            <option value="Construcción">Construcción</option>
                            <option value="Remodelación">Remodelación</option>
                            <option value="Liquidez (destino Libre)">Liquidez (destino Libre)</option>
                            <option value="Liquidez (pago a pasivos)">Liquidez (pago a pasivos)</option>
                            <option value="Mejora de Hipoteca">Mejora de Hipoteca</option>
                            <option value="Terreno + Construccion">Terreno + Construccion</option>
                            <option value="Cofinavit">Cofinavit</option>
                        </select>
                        <div className="invalid-feedback">
                            Este campo es obligatorio.
                    </div>
                    </div>
                    <div className="form-group text-center mt-4">
                        <button onClick={this.handleContinueBtn} className="btn btn-primary">Siguiente</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth, formController, creditRequest  }) {
    return {
        token: auth && auth.token,
        creditRequest,
        formController: 'formController' in formController ? formController.formController : 1,
    }
}

export default connect(mapStateToProps)(CreditTypeForm)
