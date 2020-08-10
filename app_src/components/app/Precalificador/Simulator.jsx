import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import { } from '../../actions/auth'

// components
import Loading from './Loading'


// Actions
import { saveCreditRequest } from '../actions/creditRequest'

class Simulator extends Component {
    state = {
        monto: '',
        tipoCredito: '',
        plazo: '',
        nombre: '',
        telefono: '',
        rtelefono: '',
        email: '',
        montoIsInvalid: false,
        nombreIsInvalid: false,
        telefonoIsInvalid: false,
        rtelefonoIsInvalid: false,
        emailIsInvalid: false,
        montoErrorMsg: 'Este campo es obligatorio.',
        telefonoErrorMsg: 'Este campo es obligatorio.',
        rtelefonoErrorMsg: 'Este campo es obligatorio',
        emailErrorMsg: 'Este campo es obligatorio',
        loading: true,
        serverMsg: '',
    }

    componentDidMount() {
        document.title = "Iniciar Sesión"
        console.log('test')
        const { dispatch } = this.props
        this.setState({ loading: false })
    }

    handleMontoChange = (e) => {
        const amount = parseFloat(e.target.value)

        if (amount < 250000) {
            this.setState({ montoIsInvalid: true, montoErrorMsg: 'El valor debe ser mayor o igual a $250,000 MXN' })
        } else if (amount > 100000000) {
            this.setState({ montoIsInvalid: true, montoErrorMsg: 'El valor debe ser menor o igual a $100,000,000 MXN' })
        } else {
            this.setState({ montoIsInvalid: false, montoErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ monto: e.target.value })
    }

    handleTipoCreditoChange = (e) => this.setState({ tipoCredito: e.target.value })
    handlePlazoChange = (e) => this.setState({ plazo: e.target.value })
    handleNombreChange = (e) => this.setState({ nombre: e.target.value })

    handleTelefonoChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10) {
            this.setState({ telefonoIsInvalid: true, telefonoErrorMsg: 'La entrada debe contener 10 caracteres' })
        } else {
            this.setState({ telefonoIsInvalid: false, telefonoErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ telefono: e.target.value })
    }

    handleRTelefonoChange = (e) => {
        const phone = e.target.value

        if (phone.toString().length != 10 || phone != this.state.telefono) {
            this.setState({ rtelefonoIsInvalid: true, rtelefonoErrorMsg: 'Confirmar Teléfono. Los campos deben ser idénticos' })
        } else {
            this.setState({ rtelefonoIsInvalid: false, rtelefonoErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ rtelefono: e.target.value })
    }

    handleEmailChange = (e) => {

        if (!this.validateEmail(e.target.value)) {
            this.setState({ emailIsInvalid: true, emailErrorMsg: 'Ingresa un correo electrónico válido' })
        } else {
            this.setState({ emailIsInvalid: false, emailErrorMsg: 'Este campo es obligatorio.' })
        }

        this.setState({ email: e.target.value })
    }

    handleContinueBtn = (e) => {
        e.preventDefault()

        const { monto, tipoCredito, plazo, nombre } = this.state
        const { dispatch } = this.props

        if (!monto) {
            this.setState({ montoIsInvalid: true })
        }

        if (!nombre) {
            this.setState({ nombreIsInvalid: true })
        }

        if (!monto || !nombre) {
            return
        }

        // 1. API request

        // 2. Dispatch save action
        dispatch(saveCreditRequest(params))
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const { serverMsg, loading } = this.state


        if (loading === true) {
            return <Loading />
        }

        return (
            <div className="container">
                <div className="row" style={{ marginTop: '80px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                        <div className="card form-container" >
                            <img className="card-img-top" src="https://s3-us-west-2.amazonaws.com/userdata123/www/imagefields/59450/59450072.jpg?_=1594321348260" />
                            <div className="card-body">
                                <div className="form-title">Simulador Hipotecario</div>

                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-4 col-lg-3">
                                        <div className="form-label" style={{ paddingBottom: 0 }}>Monto Solicitado: ($)<span className="form-required-symbol">*</span></div>
                                        <div className="form-sm-txt">Monto mínimo $250 mil</div>
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-lg-9">
                                        <input value={this.state.monto} onChange={this.handleMontoChange} type="number" className={this.state.montoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            {this.state.montoErrorMsg}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-4 col-lg-3">
                                        <div value={this.state.tipoCredito} onChange={this.handleTipoCreditoChange} className="form-label">Tipo de crédito<span className="form-required-symbol">*</span></div>
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-lg-9">
                                        <select className="form-control">
                                            <option value="Compra de Casa" data-index="0">Compra de Casa</option>
                                            <option value="Construcción" data-index="1">Construcción</option>
                                            <option value="Remodelación" data-index="2">Remodelación</option>
                                            <option value="Liquidez" data-index="3">Liquidez</option>
                                            <option value="Terreno" data-index="4">Terreno</option>
                                            <option value="Terreno+Construcción" data-index="5">Terreno+Construcción</option>
                                            <option value="Liquidez (Pago a pasivos)" data-index="6">Liquidez (Pago a pasivos)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-4 col-lg-3">
                                        <div className="form-label">Plazo<span className="form-required-symbol">*</span></div>
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-lg-9">
                                        <select value={this.state.plazo} onChange={this.handlePlazoChange} className="form-control">
                                            <option value="7 años" data-index="0">7 años</option>
                                            <option value="10 años" data-index="1">10 años</option>
                                            <option value="15 años" data-index="2">15 años</option>
                                            <option value="20 años" data-index="3">20 años</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-sm-12 col-md-4 col-lg-3">
                                        <div className="form-label">Nombre<span className="form-required-symbol">*</span></div>
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-lg-9">
                                        <input value={this.state.nombre} onChange={this.handleNombreChange} type="text" className={this.state.nombreIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                        <div className="invalid-feedback">
                                            Este campo es obligatorio
                                        </div>
                                    </div>
                                </div>

                                {
                                    this.state.nombre.length > 0 && this.state.monto.length > 0
                                    &&
                                    (
                                        <Fragment>
                                            <div className="row mt-3">
                                                <div className="col-sm-12 col-md-4 col-lg-3">
                                                    <div className="form-label">Teléfono<span className="form-required-symbol">*</span></div>
                                                    <div className="form-sm-txt">Revisa que esté correctamente escrito, se te enviará un SMS de verificación.</div>
                                                </div>
                                                <div className="col-sm-12 col-md-8 col-lg-9">
                                                    <input value={this.state.telefono} onChange={this.handleTelefonoChange} maxLength="10" type="number" className={this.state.telefonoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.telefonoErrorMsg}
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                this.state.telefono.length > 0
                                                && (
                                                    <div className="row mt-3">
                                                        <div className="col-sm-12 col-md-4 col-lg-3">
                                                            <div className="form-label">Confirmar Teléfono<span className="form-required-symbol">*</span></div>
                                                            <div className="form-sm-txt">Revisa que esté correctamente escrito, se te enviará un SMS de verificación.</div>
                                                        </div>
                                                        <div className="col-sm-12 col-md-8 col-lg-9">
                                                            <input value={this.state.rtelefono} onChange={this.handleRTelefonoChange} maxLength="10" type="number" className={this.state.rtelefonoIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                            <div className="invalid-feedback">
                                                                {this.state.rtelefonoErrorMsg}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            <div className="row mt-3">
                                                <div className="col-sm-12 col-md-4 col-lg-3">
                                                    <div className="form-label">Email<span className="form-required-symbol">*</span></div>
                                                    <div className="form-sm-txt">Revisa que esté correctamente escrito, se enviará la simulación a tu correo.</div>
                                                </div>
                                                <div className="col-sm-12 col-md-8 col-lg-9">
                                                    <input value={this.state.email} onChange={this.handleEmailChange} type="email" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                                    <div className="invalid-feedback">
                                                        {this.state.emailErrorMsg}
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )

                                }


                                <div className="text-center mt-4">
                                    <button onClick={this.handleContinueBtn} className="btn btn-dark btn-form">Simular mi crédito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ }) {
    return {

    }
}

export default connect(mapStateToProps)(Simulator)