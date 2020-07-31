import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ClientNameForm extends Component {

    state = {
        name: '',
        nameIsInvalid: false,
        nameErrorMsg: 'Este campo es obligatorio',
        lastName: '',
        lastNameIsInvalid: false,
        lastNameErrorMsg: 'Este campo es obligatorio',
        secondLastName: '',
        secondLastNameIsInvalid: false,
        secondLastNameErrorMsg: 'Este campo es obligatorio',
    }

    componentDidMount() {
        const { token, dispatch } = this.props
        document.title = "Ingresar Nombre | Precalificador - SwayLending"
    }

    handleNameChange = (e) => this.setState({ name: e.target.value, nameIsInvalid: e.target.value.length > 0 ? false : true })
    handleLastNameChange = (e) => this.setState({ lastName: e.target.value, lastNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleSecondLastNameChange = (e) => this.setState({ secondLastName: e.target.value, secondLastNameIsInvalid: e.target.value.length > 0 ? false : true })

    handleContinueBtn = (e) => {
        e.preventDefault()
        const { name, nameIsInvalid, lastName, lastNameIsInvalid, secondLastName, secondLastNameIsInvalid } = this.state
        const { dispatch } = this.props

        if (!name || nameIsInvalid || !lastName || lastNameIsInvalid || !secondLastName || secondLastNameIsInvalid) {
            if (!name || nameIsInvalid) { this.setState({ nameIsInvalid: true }) }
            if (!lastName || lastNameIsInvalid) { this.setState({ lastNameIsInvalid: true }) }
            if (!secondLastName || secondLastNameIsInvalid) { this.setState({ secondLastNameIsInvalid: true }) }
            return
        }

        const params = { name, lastName, secondLastName, }
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
                    <div className="form-title">¿Cuál es tu nombre?</div>
                    <div className="row mt-4">
                        <div className="form-group col-sm-12 col-lg-10 offset-lg-1">
                            <input placeholder="Nombre(s)" value={this.state.name} onChange={this.handleNameChange} className={this.state.nameIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
                            <div className="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-10 offset-lg-1">
                            <input placeholder="Apellido Paterno" value={this.state.lastName} onChange={this.handleLastNameChange} className={this.state.lastNameIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
                            <div className="invalid-feedback">Este campo es obligatorio.</div>
                        </div>
                        <div className="form-group col-sm-12 col-lg-10 offset-lg-1">
                            <input placeholder="Apellido Materno" value={this.state.secondLastName} onChange={this.handleSecondLastNameChange} className={this.state.secondLastNameIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} type="text" />
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

export default connect(mapStateToProps)(ClientNameForm)
