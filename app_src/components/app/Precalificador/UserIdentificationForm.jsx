import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Libraries
import DatePicker from 'react-date-picker'

// Actions
import { saveCreditRequest, } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

class UserIdentificationForm extends Component {

    state = {
        firstName: '',
        secondName: '',
        lastName: '',
        secondLastName: '',
        dateOfBirth: '',
        entidadNacimiento: '',
        gender: '',
        firstNameIsInvalid: false,
        lastNameIsInvalid: false,
        secondLastNameIsInvalid: false,
        entidadNacimientoIsInvalid: false,
        genderIsInvalid: false,
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { firstName, secondName, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento } = creditRequest

        this.setState({
            firstName, secondName, lastName, secondLastName,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
            gender: gender != '' ? gender : 'Hombre',
            entidadNacimiento,
            loading: false
        })
    }

    handleFirstNameChange = (e) => this.setState({ firstName: e.target.value, firstNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleSecondNameChange = (e) => this.setState({ secondName: e.target.value })
    handleLastNameChange = (e) => this.setState({ lastName: e.target.value, lastNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleSecondLastNameChange = (e) => this.setState({ secondLastName: e.target.value, secondLastNameIsInvalid: e.target.value.length > 0 ? false : true })
    handleDateOfBirthChange = (date) => this.setState({ dateOfBirth: date })
    handleGenderChange = (e) => this.setState({ gender: e.target.value })
    handleEntidadNacimientoChange = (e) => this.setState({ entidadNacimiento: e.target.value, entidadNacimientoIsInvalid: e.target.value.length > 0 ? false : true })

    handleContinueBtn = (e) => {
        e.preventDefault()

        const {
            firstName, secondName, lastName, secondLastName, dateOfBirth, gender, firstNameIsInvalid, lastNameIsInvalid, secondLastNameIsInvalid,
            entidadNacimiento, entidadNacimientoIsInvalid
        } = this.state

        const { dispatch } = this.props

        // Check PART_2
        if (!firstName || !lastName || !secondLastName || !dateOfBirth || !gender || !entidadNacimiento || firstNameIsInvalid || lastNameIsInvalid || secondLastNameIsInvalid || entidadNacimientoIsInvalid) {
            if (!firstName) this.setState({ firstNameIsInvalid: true })
            if (!lastName) this.setState({ lastNameIsInvalid: true })
            if (!secondLastName) this.setState({ secondLastNameIsInvalid: true })
            if (!entidadNacimiento) this.setState({ entidadNacimientoIsInvalid: true })
            return
        }

        // save credit request form
        const params = {
            firstName, secondName, lastName, secondLastName, dateOfBirth, gender, entidadNacimiento
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
        const {
            firstName, firstNameIsInvalid, secondName, lastName, lastNameIsInvalid,
            secondLastName, secondLastNameIsInvalid, dateOfBirth, gender,
        } = this.state

        return (
            <Fragment>
                <div className="form-group mt-4">
                    <label className="form-label">Nombre<span className="form-required-symbol">*</span></label>
                    <input value={firstName} onChange={this.handleFirstNameChange} type="text" className={firstNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        Este campo es obligatorio.
                                                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Segundo Nombre</label>
                    <input value={secondName} onChange={this.handleSecondNameChange} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label className="form-label">Apellido Paterno<span className="form-required-symbol">*</span></label>
                    <input value={lastName} onChange={this.handleLastNameChange} type="text" className={lastNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        Este campo es obligatorio.
                                                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Apellido Materno<span className="form-required-symbol">*</span></label>
                    <input value={secondLastName} onChange={this.handleSecondLastNameChange} type="text" className={secondLastNameIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        Este campo es obligatorio.
                                                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Fecha de nacimiento<span className="form-required-symbol">*</span></label>
                    <div>
                        <DatePicker
                            onChange={this.handleDateOfBirthChange}
                            value={dateOfBirth}
                            className='datepicker'
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Estado de nacimiento<span className="form-required-symbol">*</span></label>
                    <select value={this.state.entidadNacimiento} onChange={this.handleEntidadNacimientoChange} className={this.state.entidadNacimientoIsInvalid ? 'form-control is-invalid' : "form-control"}>
                        <option value="">Seleccionar</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="AGS">Aguascalientes</option>
                        <option value="BCN">Baja California</option>
                        <option value="BCS">Baja California Sur</option>
                        <option value="CAM">Campeche</option>
                        <option value="CHP">Chiapas</option>
                        <option value="CHI">Chihuahua</option>
                        <option value="COA">Coahuila</option>
                        <option value="COL">Colima</option>
                        <option value="DUR">Durango</option>
                        <option value="GTO">Guanajuato</option>
                        <option value="GRO">Guerrero</option>
                        <option value="HGO">Hidalgo</option>
                        <option value="JAL">Jalisco</option>
                        <option value="MEX">M&eacute;xico</option>
                        <option value="MIC">Michoac&aacute;n</option>
                        <option value="MOR">Morelos</option>
                        <option value="NAY">Nayarit</option>
                        <option value="NLE">Nuevo Le&oacute;n</option>
                        <option value="OAX">Oaxaca</option>
                        <option value="PUE">Puebla</option>
                        <option value="QRO">Quer&eacute;taro</option>
                        <option value="ROO">Quintana Roo</option>
                        <option value="SLP">San Luis Potos&iacute;</option>
                        <option value="SIN">Sinaloa</option>
                        <option value="SON">Sonora</option>
                        <option value="TAB">Tabasco</option>
                        <option value="TAM">Tamaulipas</option>
                        <option value="TLX">Tlaxcala</option>
                        <option value="VER">Veracruz</option>
                        <option value="YUC">Yucat&aacute;n</option>
                        <option value="ZAC">Zacatecas</option>
                    </select>
                    <div className="invalid-feedback">
                        Este campo es obligatorio.
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Sexo<span className="form-required-symbol">*</span></label>
                    <select value={gender} onChange={this.handleGenderChange} className="form-control">
                        <option value="Hombre" >Hombre</option>
                        <option value="Mujer">Mujer</option>
                    </select>
                </div>
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

function mapStateToProps({ preCreditRequest, }) {
    return {
        creditRequest: preCreditRequest,
    }
}

export default connect(mapStateToProps)(UserIdentificationForm)