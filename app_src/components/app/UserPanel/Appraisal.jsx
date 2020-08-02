import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'


class Appraisal extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Avalúo - SwayLending"

        this.setState({
            loading: false
        })
    }

    render() {

        const { loading } = this.state


        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="row p-4" style={{ minHeight: '820px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 " >
                        <div className="breadcrumb-title mt-4">Pre-aprobación {'>'} Carga de Documentos {'>'} Propuestas {'>'} Solicitud {'>'} Autorización {'>'} <b>Avalúo</b> {'>'} Firma en Notaría</div>
                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Avalúo</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>
                        {/* <div className="page-description">
                            A continuación puedes ver las opciones disponibles de acuerdo a tu perfil elige una opción para continuar tu solicitud, posterior a la conclusión
                            de la solicitud, obtendrás la autorización y la tasa del crédito autorizado.
                        </div> */}
                        <div className="row mt-5">
                            <div className="col-sm-12 col-md-6 col-lg-6 ">

                                <div className="form-group">
                                    <label className="form-label">Contacto para obtener la documentación de la propiedad</label>
                                    <input placeholder="Nombre" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                    <div className="invalid-feedback">
                                        {this.state.emailErrorMsg}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Teléfono</label>
                                    <input placeholder="Teléfono" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                    <div className="invalid-feedback">
                                        {this.state.emailErrorMsg}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} type="text" className={this.state.emailIsInvalid ? 'form-control is-invalid' : 'form-control'} />
                                    <div className="invalid-feedback">
                                        {this.state.emailErrorMsg}
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 ">
                                <div className="row mt-2" >
                                    <div className="form-group col-sm-12 col-lg-10 offset-lg-1" >
                                        <div className="text-center">
                                            <div>
                                                <button onClick={this.handleContinueBtn} className="btn btn-green" style={{width: '250px'}}>Cargar Documentos</button>
                                                <div className="form-label mt-3 text-justify">
                                                    Si tu tienes toda la documentación o parte de la documentación
                                                    también puedes cargar los documentos desde esta opción
                                            </div></div>
                                            <div className="mt-5">
                                                <button onClick={this.handleContinueBtn} className="btn btn-brown" style={{width: '250px'}}>Pagar Avalúo</button>
                                                <div className="form-label mt-3 text-center">Pulse para descargar la orden de pago de avalúo</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardTemplate>
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

export default connect(mapStateToProps)(Appraisal)
