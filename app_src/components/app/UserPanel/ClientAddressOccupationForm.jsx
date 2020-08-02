import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import CurrencyInput from 'react-currency-input'
import DatePicker from 'react-date-picker'

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class ClientAddressOccupationForm extends Component {

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
                    <div className="form-title text-left" style={{ fontSize: '24px', fontWeight: '400' }}>Domicilio del solicitante</div>
                    <hr className="form-title-separator" />

                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Calle</label>
                                <input placeholder="Calle" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Número exterior</label>
                                <input placeholder="Número exterior" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Número interior (opcional)</label>
                                <input placeholder="Número interior" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Código postal</label>
                                <input placeholder="Código postal" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Colonia</label>
                                <input placeholder="Colonia" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Alcaldía o municipio</label>
                                <input placeholder="Alcaldía o municipio" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Tiempo de residencia</label>
                                <input placeholder="Tiempo de residencia" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Teléfono fijo</label>
                                <input placeholder="Teléfono fijo" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="form-title text-left" style={{ fontSize: '24px', fontWeight: '400', marginTop: '50px' }}>Ingresos</div>
                    <hr className="form-title-separator" />

                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Ingresos</label>
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
                                <label className="form-label">Tipo de ingresos</label>
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
                                <label className="form-label">Escolaridad</label>
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
                                <label className="form-label">Ocupación</label>
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
                                <label className="form-label">Nombre de la empresa</label>
                                <input placeholder="Nombre de la empresa" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Descripción de actividades</label>
                                <input placeholder="Descripción de actividades" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Puesto</label>
                                <input placeholder="Puesto" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Tipo de contrato</label>
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
                                <label className="form-label">Sueldos / Honorarios</label>
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
                                <label className="form-label">Bonos / Vales</label>
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
                                <label className="form-label">Comisiones</label>
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
                    </div>

                    <div className="form-title text-left" style={{ fontSize: '24px', fontWeight: '400', marginTop: '50px' }}>Dirección Empresa</div>
                    <hr className="form-title-separator" />

                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Calle</label>
                                <input placeholder="Calle" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Número exterior</label>
                                <input placeholder="Número exterior" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Número interior (opcional)</label>
                                <input placeholder="Número interior" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group mt-4">
                                <label className="form-label">Código postal</label>
                                <input placeholder="Código postal" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Colonia</label>
                                <input placeholder="Colonia" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Alcaldía o municipio</label>
                                <input placeholder="Alcaldía o municipio" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Estado</label>
                                <input placeholder="Tiempo de residencia" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                <div className="invalid-feedback">
                                    {this.state.emailErrorMsg}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="form-group">
                                <label className="form-label">Teléfono</label>
                                <input placeholder="Teléfono fijo" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
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

export default connect(mapStateToProps)(ClientAddressOccupationForm)
