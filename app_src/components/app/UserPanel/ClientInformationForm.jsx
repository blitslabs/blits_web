import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'
import DatePicker from 'react-date-picker'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ClientInformationForm extends Component {

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
                <div className="col-sm-12 ">
                    <div className="form-title text-left" style={{ fontSize: '24px', fontWeight: '400' }}>Información del crédito</div>
                    <hr className="form-title-separator" />

                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Destino del crédito</label>
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
                            <div className="form-group mt-4">
                                <label className="form-label">Esquemas de pago</label>
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
                            <div className="form-group mt-4">
                                <label className="form-label">Programa de financiamiento</label>
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
                            <div className="form-group mt-4">
                                <label className="form-label">Plazo</label>
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

                    <div className="row mt-2">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Valor de la vivienda</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <CurrencyInput prefix="$" precision="0" className={this.state.monthlyIncomeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                    <div className="invalid-feedback">
                                        {this.state.propertyValueErrorMsg}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Monto solicitado</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <CurrencyInput prefix="$" precision="0" className={this.state.monthlyIncomeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                    <div className="invalid-feedback">
                                        {this.state.propertyValueErrorMsg}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Destino del inmueble</label>
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
                                <label className="form-label">Oferta</label>
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


                    <div className="form-title text-left" style={{ fontSize: '24px', fontWeight: '400', marginTop: '50px' }}>Datos personales</div>
                    <hr className="form-title-separator" />

                    <div className="row mt-4">
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

                    <div className="row mt-2">
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
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">RFC</label>
                                <input placeholder="RFC" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
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
                                <label className="form-label">Estado civil</label>
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
                                <label className="form-label">Dependientes económicos</label>
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

                    <div className="row mt-2">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Teléfono móvil</label>
                                <input placeholder="10 dígitos" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Correo electrónico</label>
                                <input placeholder="ejemplo@email.com" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group text-center mt-5">
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

export default connect(mapStateToProps)(ClientInformationForm)
