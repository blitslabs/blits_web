import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

class AddressForm extends Component {

    state = {
        calle: '',
        numeroExt: '',
        colonia: '',
        municipio: '',
        entidadFederativa: '',
        postalCode: '',
        calleIsInvalid: false,
        numeroExtIsInvalid: false,
        coloniaIsInvalid: false,
        municipioIsInvalid: false,
        entidadFederativaIsInvalid: false,
        postalCodeIsInvalid: false,
        calleErrorMsg: 'Este campo es obligatorio.',
        numeroExtErrorMsg: 'Este campo es obligatorio.',
        coloniaErrorMsg: 'Este campo es obligatorio.',
        municipioErrorMsg: 'Este campo es obligatorio.',
        entidadFederativaErrorMsg: ' Este campo es obligatorio',
        postalCodeErrorMsg: 'Este campo es obligatorio.',
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { email, phone, firstName, secondName, lastName, secondLastName, dateOfBirth, gender,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode, creditType, creditAmount, propertyValue,
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription } = creditRequest
        this.setState({

            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode,

            loading: false
        })
    }

    /* PART_4 */
    handleCalleChange = (e) => this.setState({ calle: e.target.value, calleIsInvalid: e.target.value.length > 0 ? false : true })
    handleNumeroExtChange = (e) => this.setState({ numeroExt: e.target.value, numeroExtIsInvalid: e.target.value.length > 0 ? false : true })
    handleColoniaChange = (e) => this.setState({ colonia: e.target.value, coloniaIsInvalid: e.target.value.length > 0 ? false : true })
    handleMunicipioChange = (e) => this.setState({ municipio: e.target.value, municipioIsInvalid: e.target.value.length > 0 ? false : true })
    handleEntidadFederativaChange = (e) => this.setState({ entidadFederativa: e.target.value, entidadFederativaIsInvalid: e.target.value.length > 0 ? false : true })
    handlePostalCodeChange = (e) => this.setState({ postalCode: e.target.value, postalCodeIsInvalid: e.target.value.length > 0 ? false : true })

    handleContinueBtn = (e) => {
        e.preventDefault()

        const {
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode, calleIsInvalid, numeroExtIsInvalid, municipioIsInvalid, postalCodeIsInvalid,
        } = this.state

        const { creditRequest, dispatch } = this.props

        // Check PART_4
        if (!calle || !numeroExt || !colonia || !municipio || !entidadFederativa || !postalCode ||
            calleIsInvalid || numeroExtIsInvalid || municipioIsInvalid || postalCodeIsInvalid) {
            if (!calle) this.setState({ calleIsInvalid: true })
            if (!numeroExt) this.setState({ numeroExtIsInvalid: true })
            if (!colonia) this.setState({ coloniaIsInvalid: true })
            if (!municipio) this.setState({ municipioIsInvalid: true })
            if (!entidadFederativa) this.setState({ entidadFederativaIsInvalid: true })
            if (!postalCode) this.setState({ postalCodeIsInvalid: true })
            return
        }

        // save credit request form
        const params = {
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode
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
            calle, handleCalleChange, calleIsInvalid, calleErrorMsg,
        } = this.props

        return (
            <Fragment>
                <div className="form-group mt-4">
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '75%', marginRight: '10px' }}>
                            <label className="form-label">Calle<span className="form-required-symbol">*</span></label>
                            <input value={this.state.calle} onChange={this.handleCalleChange} type="text" className={this.state.calleIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                            <div className="invalid-feedback">
                                {this.state.calleErrorMsg}
                            </div>
                        </div>
                        <div style={{ width: '25%' }}>
                            <label className="form-label">No. Exterior<span className="form-required-symbol">*</span></label>
                            <input value={this.state.numeroExt} onChange={this.handleNumeroExtChange} type="text" className={this.state.numeroExtIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                        </div>
                    </div>

                </div>

                <div className="form-group">

                </div>

                <div className="form-group">
                    <label className="form-label">Colonia<span className="form-required-symbol">*</span></label>
                    <input value={this.state.colonia} onChange={this.handleColoniaChange} type="text" className={this.state.coloniaIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.coloniaErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Alcanldía / Municipio<span className="form-required-symbol">*</span></label>
                    <input value={this.state.municipio} onChange={this.handleMunicipioChange} type="text" className={this.state.municipioIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.municipioErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Estado<span className="form-required-symbol">*</span></label>
                    <select value={this.state.entidadFederativa} onChange={this.handleEntidadFederativaChange} className={this.state.entidadFederativaIsInvalid ? 'form-control is-invalid' : "form-control"}>
                        <option value="">Seleccionar</option>
                        <option value="CDMX">Ciudad de México</option>
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
                        {this.state.entidadFederativaErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Código Postal<span className="form-required-symbol">*</span></label>
                    <input value={this.state.postalCode} onChange={this.handlePostalCodeChange} maxLength="10" type="number" className={this.state.postalCodeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.postalCodeErrorMsg}
                    </div>
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

function mapStateToProps({ preCreditRequest }) {
    return {
        creditRequest: preCreditRequest,
    }
}

export default connect(mapStateToProps)(AddressForm)