import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

// Libraries
import currencyFormatter from 'currency-formatter'

class ClientHasProspectivePropertyAmountForm extends Component {

    state = {
        initialPayment: '$0.00',
        selectedOption: ''
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props

        document.title = "Precalificador"

        const propertyValue = parseFloat(creditRequest.prospectivePropertyValue.replace('$', '').replace(',', ''))

        this.setState({
            initialPayment: propertyValue * 0.17
        })

    }

    handleOptionClick = (option) => this.setState({ selectedOption: option })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { selectedOption } = this.state
        const { dispatch } = this.props

        if (!selectedOption) {
            return
        }

        const params = { clientHasPropectivePropertyAmount: selectedOption }
        dispatch(saveCreditRequest(params))
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {

        const firstOption = 'Sí, cuento con esa cantidad'
        const sencondOption = 'No, necesito asesoria de opciones'

        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 text-center">
                    <div className="form-title">Necesitarías hacer un gasto inicial* aproximado de {currencyFormatter.format(this.state.initialPayment, { code: 'MXN' })}</div>
                    <div className="form-label">*Enganche, avalúo, gastos notariales</div>
                    <div className="form-title mt-5">¿Cuentas con esa cantidad?</div>
                    <div className="form-group">
                        <div>
                            <button onClick={e => this.handleOptionClick(firstOption)} className={this.state.selectedOption === firstOption ? "btn btn-light btn-lg btn-selected mt-4" : "btn btn-light btn-lg btn-select mt-4"}>Ya lo tengo</button>
                        </div>
                        <div>
                            <button onClick={e => this.handleOptionClick(sencondOption)} className={this.state.selectedOption === sencondOption ? "btn btn-light btn-lg btn-selected mt-3" : "btn btn-light btn-lg btn-select mt-3"}>Lo estoy buscando</button>
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

export default connect(mapStateToProps)(ClientHasProspectivePropertyAmountForm)
