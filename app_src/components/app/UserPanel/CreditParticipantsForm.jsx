import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'
import DatePicker from 'react-date-picker'
import Modal from 'react-modal'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

        maxHeight: '100vh'
    },
    overlay: {
        backgroundColor: '#0000004a'
    },
    parent: {
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
}

Modal.setAppElement('#root')

class CreditParticipantsForm extends Component {

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
        modalIsOpen: true
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

        const { modalIsOpen } = this.state

        return (
            <div className="row mt-5">
                <div className="col-sm-12 ">
                    <div className="form-title text-left" style={{ fontSize: '24px', fontWeight: '400' }}>Participantes</div>
                    <hr className="form-title-separator" />

                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Parentesco</th>
                                <th>Participa con ingresos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Susana Dorantes</td>
                                <td>Cónyugue</td>
                                <td>No</td>
                                <td>
                                    <button className="btn icon-btn"><i className="fa fa-pencil"></i></button>
                                    <button className="btn icon-btn"><i className="fa fa-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-right">
                        <button onClick={() => this.setState({ modalIsOpen: true })} className="btn btn-red">Agregar participante</button>
                    </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div className="row">
                            <div className="col-12">
                                <div style={{ position: 'relative', float: 'right', }}><button onClick={() => this.setState({ modalIsOpen: false })} className="btn icon-btn"><i style={{ color: 'grey' }} className="fa fa-close"></i></button></div>
                                <div className="modal-title">Obligado solidario</div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Nombre(s)</label>
                                            <input placeholder="Nombre(s)" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Primer apellido</label>
                                            <input placeholder="Primer apellido" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Segundo apellido</label>
                                            <input placeholder="Segundo apellido" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Fecha de nacimiento</label>
                                            <div>
                                                <DatePicker
                                                    onChange={this.handleDateOfBirthChange}
                                                    value={this.state.dateOfBirth}
                                                    className='datepicker'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Parentesco</label>
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
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Nacionalidad</label>
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
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Lugar de nacimiento</label>
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
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Género</label>
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
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">RFC</label>
                                            <input placeholder="RFC" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">CURP</label>
                                            <input placeholder="CURP" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Estadi civil</label>
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
                                    </div>
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Teléfono móvil</label>
                                            <input placeholder="Teléfono fijo" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-group">
                                            <label className="form-label">Correo electrónico</label>
                                            <input placeholder="Teléfono fijo" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                            <div className="invalid-feedback">
                                                {this.state.emailErrorMsg}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-sm-12 col-md-3">
                                        <div className="form-label">¿Participa con ingresos?</div>
                                        <div class="custom-control custom-switch custom-switch-lg">
                                            <input type="checkbox" class="custom-control-input" id="customSwitch1" />
                                            <label class="custom-control-label" for="customSwitch1"></label>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row mt-4">
                                    <div className="col-12 text-right">
                                        <div>
                                            <button className="btn btn-red mr-2">Agregar</button>
                                            <button onClick={() => this.setState({ modalIsOpen: false })} className="btn btn-red-outline">Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <div className="form-group text-center mt-5">
                        <button className="btn btn-red-outline">Continuar</button>
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

export default connect(mapStateToProps)(CreditParticipantsForm)
