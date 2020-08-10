import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest, } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

class CreditAmountForm extends Component {

    state = {
        creditAmount: '',
        creditAmountIsInvalid: false,
        creditAmountErrorMsg: 'Este campo es obligatorio.',
        propertyValue: '',
        propertyValueIsInvalid: false,
        propertyValueErrorMsg: 'Este campo es obligatorio.',
        ownsProperty: '',
        ownsPropertyIsInvalid: false,
        ownsPropertyErrorMsg: 'Este campos es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { creditAmount, propertyValue, ownsProperty } = creditRequest

        this.setState({
            creditAmount, propertyValue, ownsProperty,
            loading: false
        })
    }

    handleCreditAmountChange = (e) => {
        let amount = e.target.value
        amount = parseFloat(amount.replace('$', '').replace(/,/g, ''))

        if (amount < 250000) {
            this.setState({ creditAmountIsInvalid: true, creditAmountErrorMsg: 'El valor debe ser mayor o igual a $250,000 MXN' })
        } else if (amount > 100000000) {
            this.setState({ creditAmountIsInvalid: true, creditAmountErrorMsg: 'El valor debe ser menor o igual a $100,000,000 MXN' })
        } else {
            this.setState({ creditAmountIsInvalid: false, creditAmountErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ creditAmount: e.target.value })
    }

    handlePropertyValueChange = (e) => {
        let amount = e.target.value
        amount = parseFloat(amount.replace('$', '').replace(/,/g, ''))

        if (amount <= 0) {
            this.setState({ propertyValueIsInvalid: true, propertyValueErrorMsg: 'Ingresa un cantidad válida' })
        } else {
            this.setState({ propertyValueIsInvalid: false, propertyValueErrorMsg: 'Este campo es obligatorio.' })
        }
        this.setState({ propertyValue: e.target.value })
    }

    handleOwnsPropertyChange = (e) => this.setState({ ownsProperty: e.target.value, ownsPropertyIsInvalid: e.target.value.length > 0 ? false : true })

    handleContinueBtn = (e) => {
        e.preventDefault()

        const {
            creditAmount, creditAmountIsInvalid, propertyValue, ownsProperty, ownsPropertyIsInvalid, propertyValueIsInvalid
        } = this.state

        const { creditRequest, dispatch } = this.props
        const { creditType } = creditRequest

        if (!creditAmount || creditAmountIsInvalid) {
            if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
            return
        }

        if (creditType === 'Adquisición Tradicional') {
            if (!propertyValue || propertyValueIsInvalid) {
                if (!propertyValue) this.setState({ propertyValueIsInvalid: true })
                return
            }
        }

        if (creditType === 'Construcción') {
            if (!ownsProperty || ownsPropertyIsInvalid) {
                if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
                if (!ownsProperty) this.setState({ ownsPropertyIsInvalid: true })
                return
            }

            if (ownsProperty === 'Sí') {
                if (!propertyValue || propertyValueIsInvalid) {
                    if (!propertyValue) this.setState({ propertyValueIsInvalid: true })
                    return
                }
            }
        }


        if(creditType !== 'Adquisición Tradicional' && creditType !== 'Construcción') {
            if (!ownsProperty || ownsPropertyIsInvalid) {
                if (!creditAmount) this.setState({ creditAmountIsInvalid: true })
                if (!ownsProperty) this.setState({ ownsPropertyIsInvalid: true })
                return
            }

            if (ownsProperty === 'Sí') {
                if (!propertyValue || propertyValueIsInvalid) {
                    if (!propertyValue ) this.setState({ propertyValueIsInvalid: true })
                    return
                }
            }
        }


        // save credit request form
        const params = {
            creditAmount, ownsProperty, propertyValue
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
        const { creditRequest } = this.props
        const { creditType } = creditRequest

        return (
            <Fragment>
                <div className="form-group">
                    <label className="form-label">Monto de crédito que desea solicitar<span className="form-required-symbol">*</span></label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">MXN</span>
                        </div>
                        <CurrencyInput prefix="$" precision="0" value={this.state.creditAmount} onChangeEvent={this.handleCreditAmountChange} className={this.state.creditAmountIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                        <div className="invalid-feedback">
                            {this.state.creditAmountErrorMsg}
                        </div>
                    </div>
                </div>
                {
                    creditType === 'Construcción'
                        ?
                        <Fragment>
                            <div className="form-group mt-4">
                                <label className="form-label">¿Usted es propietario del terreno sobre el cual desea construir?<span className="form-required-symbol">*</span></label>
                                <select value={this.state.ownsProperty} onChange={this.handleOwnsPropertyChange} className={this.state.ownsPropertyIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                                    <option value="">Seleccionar</option>
                                    <option value="Sí">Sí</option>
                                    <option value="No">No</option>
                                </select>
                                <div className="invalid-feedback">
                                    {this.state.ownsPropertyErrorMsg}
                                </div>
                            </div>
                            {
                                (creditType === 'Construcción' && this.state.ownsProperty === 'Sí')
                                    ?
                                    <div className="form-group">
                                        <label className="form-label">¿Cuál es el valor aproximado de su terreno? <span className="form-required-symbol">*</span></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">MXN</span>
                                            </div>
                                            <CurrencyInput prefix="$" precision="0" value={this.state.propertyValue} onChangeEvent={this.handlePropertyValueChange} className={this.state.propertyValueIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.propertyValueErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                        </Fragment>
                        :
                        creditType === 'Adquisición Tradicional'
                            ?
                            <Fragment>

                                <div className="form-group">
                                    <label className="form-label">¿Cual es el valor aproximado de la propiedad que desea comprar?<span className="form-required-symbol">*</span></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">MXN</span>
                                        </div>
                                        <CurrencyInput prefix="$" precision="0" value={this.state.propertyValue} onChangeEvent={this.handlePropertyValueChange} className={this.state.propertyValueIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.propertyValueErrorMsg}
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                            :
                            <Fragment>
                                <div className="form-group mt-4">
                                    <label className="form-label">¿Usted es propietario de al menos una casa habitación?<span className="form-required-symbol">*</span></label>
                                    <select value={this.state.ownsProperty} onChange={this.handleOwnsPropertyChange} className={this.state.ownsPropertyIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                                        <option value="">Seleccionar</option>
                                        <option value="Sí">Sí</option>
                                        <option value="No">No</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        {this.state.ownsPropertyErrorMsg}
                                    </div>
                                </div>
                                {
                                    (this.state.ownsProperty === 'Sí')
                                        ?
                                        <div className="form-group">
                                            <label className="form-label">¿Cuál es el valor aproximado de su propiedad? <span className="form-required-symbol">*</span></label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">MXN</span>
                                                </div>
                                                <CurrencyInput prefix="$" precision="0" value={this.state.propertyValue} onChangeEvent={this.handlePropertyValueChange} className={this.state.propertyValueIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                <div className="invalid-feedback">
                                                    {this.state.propertyValueErrorMsg}
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </Fragment>
                }

                <div className="text-center " style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="text-center mt-4" style={{ marginRight: '10px' }}>
                        <button onClick={this.handleBackBtn} className="btn btn-light btn-continue">Previa</button>
                    </div>
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

export default connect(mapStateToProps)(CreditAmountForm)