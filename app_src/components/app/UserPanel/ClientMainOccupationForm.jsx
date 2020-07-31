import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ClientMainOccupationForm extends Component {

    state = {
        selectedOption: '',

    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "Actividad Principal | Precalificador - SwayLending"
        this.setState({ selectedOption: creditRequest.clientMainOccupation })
    }

    handleOptionClick = (option) => this.setState({ selectedOption: option })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { selectedOption } = this.state
        const { dispatch } = this.props

        if (!selectedOption) {
            return
        }

        const params = { clientMainOccupation: selectedOption }
        dispatch(saveCreditRequest(params))
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {

        const option1 = 'Empleado'
        const option2 = 'Independiente'
        const option3 = 'Empresario'
        const option4 = 'Socio'

        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 text-center">
                    <div className="form-title">¿Qué tipo de actividad realizas principalmente?</div>
                    <div className="form-group">
                        <div>
                            <button onClick={e => this.handleOptionClick(option1)} className={this.state.selectedOption === option1 ? "btn btn-light btn-lg btn-selected mt-4" : "btn btn-light btn-lg btn-select mt-4"}>{option1}</button>
                        </div>
                        <div>
                            <button onClick={e => this.handleOptionClick(option2)} className={this.state.selectedOption === option2 ? "btn btn-light btn-lg btn-selected mt-3" : "btn btn-light btn-lg btn-select mt-3"}>{option2}</button>
                        </div>
                        <div>
                            <button onClick={e => this.handleOptionClick(option3)} className={this.state.selectedOption === option3 ? "btn btn-light btn-lg btn-selected mt-3" : "btn btn-light btn-lg btn-select mt-3"}>{option3}</button>
                        </div>
                        <div>
                            <button onClick={e => this.handleOptionClick(option4)} className={this.state.selectedOption === option4 ? "btn btn-light btn-lg btn-selected mt-3" : "btn btn-light btn-lg btn-select mt-3"}>{option4}</button>
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

export default connect(mapStateToProps)(ClientMainOccupationForm)
