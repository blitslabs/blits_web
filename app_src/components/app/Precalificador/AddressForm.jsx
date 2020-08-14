import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Actions
import { saveCreditRequest, } from '../../../actions/preCreditRequest'
import { nextFormController, backFormController } from '../../../actions/preFormController'

// API
import { getAddressesByPostalCode } from '../../../utils/api'

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
        addresses: [],
    }

    componentDidMount() {
        const { creditRequest } = this.props
        const { email, phone, firstName, secondName, lastName, secondLastName, dateOfBirth, gender,
            calle, numeroExt, colonia, municipio, entidadFederativa, postalCode, creditType, creditAmount, propertyValue,
            sourceOfResources, verifiableIncome, unverifiableIncome, jobDescription } = creditRequest

        if (postalCode.length === 5) {
            getAddressesByPostalCode({ postalCode })
                .then(data => data.json())
                .then((res) => {
                    console.log(res)
                    if (res.status === 'OK') {
                        this.setState({                          
                            addresses: res.payload,
                        })
                    }
                })
        }

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

    handlePostalCodeChange = (e) => {
        const postalCode = e.target.value

        if (postalCode.length > 5) return

        if (postalCode.length === 5) {
            getAddressesByPostalCode({ postalCode })
                .then(data => data.json())
                .then((res) => {
                    console.log(res)
                    if (res.status === 'OK') {
                        this.setState({
                            municipio: res.payload[0].municipio,
                            entidadFederativa: res.payload[0].estado,
                            addresses: res.payload,
                        })
                    }
                })
        }
        this.setState({ postalCode: e.target.value, postalCodeIsInvalid: e.target.value.length === 5 ? false : true })
    }

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
                    <label className="form-label">Código Postal<span className="form-required-symbol">*</span></label>
                    <input value={this.state.postalCode} onChange={this.handlePostalCodeChange} maxLength="10" type="number" className={this.state.postalCodeIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.postalCodeErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Colonia<span className="form-required-symbol">*</span></label>
                    <select value={this.state.colonia} onChange={this.handleColoniaChange} className={this.state.coloniaIsInvalid ? 'form-control is-invalid' : 'form-control'}>
                        <option value="">Seleccionar</option>
                        {
                            this.state.addresses.length > 0 ?
                                this.state.addresses.map((a) => (
                                    <option key={a.id} value={a.asentamiento}>{a.asentamiento}</option>
                                ))
                                : null
                        }
                    </select>
                    <div className="invalid-feedback">
                        {this.state.coloniaErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Alcanldía / Municipio<span className="form-required-symbol">*</span></label>
                    <input readOnly value={this.state.municipio} onChange={this.handleMunicipioChange} type="text" className={this.state.municipioIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.municipioErrorMsg}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Estado<span className="form-required-symbol">*</span></label>
                    <input readOnly value={this.state.entidadFederativa} onChange={this.handleEntidadFederativaChange} type="text" className={this.state.entidadFederativaIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                    <div className="invalid-feedback">
                        {this.state.entidadFederativaErrorMsg}
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