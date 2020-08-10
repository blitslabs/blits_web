import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

class CreditTypeForm extends Component {

    state = {
        creditType: '',
        creditTypeIsInvalid: false,
        creditTypeErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { creditType } = creditRequest

        this.setState({
            creditType,
            loading: false
        })
    }

    handleCreditTypeChange = (e) => this.setState({ creditType: e.target.value, creditTypeIsInvalid: e.target.value.length > 0 ? false : true })


    handleContinueBtn = (e) => {
        e.preventDefault()

        const {
            creditType, creditTypeIsInvalid,
        } = this.state

        const { dispatch } = this.props

        if (!creditType || creditTypeIsInvalid) {
            this.setState({ creditTypeIsInvalid: true })
            return 
        }

        // save credit request form
        const params = {
            creditType
        }

        dispatch(saveCreditRequest(params))

        // next form controller
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {

        return (
            <Fragment>
                <div className="mt-2" style={{ color: '#000080' }}>Descubre en minutos si eres sujeto de crédito y el monto máximo que se puede prestar así como la tasa de interés disponible para tí.</div>
                <div className="form-description mt-4">-Recibirás una Resolución de acuerdo con los datos declarados</div>
                <div className="form-description mt-2">-En caso de estar interesado, podrás continuar el proceso en línea o en las oficinas de SwayLending de tu ciudad, en un proceso presencial.</div>
                <div className="form-description mt-2">-Esta pre-calificación no supone costo o compromiso alguno para usted.</div>
                <div className="mt-4" style={{ color: '#4c4c4c', fontStyle: 'italic', fontFamily: "Open Sans, sans-serif" }}>Por favor ingresa los siguientes datos:</div>

                <div className="form-group mt-4">
                    <label className="form-label">Tipo de crédito<span className="form-required-symbol">*</span></label>
                    <select value={this.state.creditType} onChange={this.handleCreditTypeChange} className={this.state.creditTypeIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                        <option value="">Seleccionar</option>
                        <option value="Adquisición Tradicional">Adquisición Tradicional</option>
                        <option value="Construcción">Construcción</option>
                        <option value="Remodelación">Remodelación</option>
                        <option value="Liquidez (destino Libre)">Liquidez (destino Libre)</option>
                        <option value="Liquidez (pago a pasivos)">Liquidez (pago a pasivos)</option>
                        <option value="Mejora de Hipoteca">Mejora de Hipoteca</option>
                        <option value="Terreno+Construccion">Terreno+Construccion</option>
                        <option value="Cofinavit">Cofinavit</option>
                    </select>
                    <div className="invalid-feedback">
                        {this.state.creditTypeErrorMsg}
                    </div>
                </div>

                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                        <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                    </div> */}
                    <div className="text-center mt-4">
                        <button onClick={this.handleContinueBtn} className="btn btn-light btn-continue">Próxima página</button>
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

export default connect(mapStateToProps)(CreditTypeForm)