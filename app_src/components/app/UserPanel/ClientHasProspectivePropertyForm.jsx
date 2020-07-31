import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ClientHasProspectivePropertyForm extends Component {

    state = {
        selectedOption: '',

    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Monto del Inmueble Buscado | Precalificador - SwayLending"


    }

    handleOptionClick = (option) => this.setState({ selectedOption: option })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { selectedOption } = this.state
        const { dispatch } = this.props

        if (!selectedOption) {
            return
        }

        const params = { clientHasProspectiveProperty: selectedOption }
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
                    <div className="form-title">¿Ya tienes un inmueble identificado?</div>
                    <div className="form-group">
                        <div>
                            <button onClick={e => this.handleOptionClick('Ya lo tengo')} className={this.state.selectedOption === 'Ya lo tengo' ? "btn btn-light btn-lg btn-selected mt-4" : "btn btn-light btn-lg btn-select mt-4"}>Ya lo tengo</button>
                        </div>
                        <div>
                            <button onClick={e => this.handleOptionClick('Lo estoy buscando')} className={this.state.selectedOption === 'Lo estoy buscando' ? "btn btn-light btn-lg btn-selected mt-3" : "btn btn-light btn-lg btn-select mt-3"}>Lo estoy buscando</button>
                        </div>
                        <div>
                            <button onClick={e => this.handleOptionClick('Solo quiero conocer mi crédito')} className={this.state.selectedOption === 'Solo quiero conocer mi crédito' ? "btn btn-light btn-lg btn-selected mt-3" : "btn btn-light btn-lg btn-select mt-3"}>Solo quiero conocer mi crédito</button>
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

export default connect(mapStateToProps)(ClientHasProspectivePropertyForm)
