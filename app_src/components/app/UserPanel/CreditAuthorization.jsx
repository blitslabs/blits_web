import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'


class CreditAuthorization extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Autorización - SwayLending"

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
                        <div className="breadcrumb-title mt-4">Pre-aprobación {'>'} Carga de Documentos {'>'} Propuestas {'>'} Solicitud {'>'} <b>Autorización</b> {'>'} Avalúo {'>'} Firma en Notaría</div>
                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Autorización</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>
                        {/* <div className="page-description">
                            A continuación puedes ver las opciones disponibles de acuerdo a tu perfil elige una opción para continuar tu solicitud, posterior a la conclusión
                            de la solicitud, obtendrás la autorización y la tasa del crédito autorizado.
                        </div> */}
                        <div className="row mt-5">
                            <div className="col-sm-12 col-md-6 col-lg-6 ">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th style={{ borderTop: 'none' }}>
                                                <img className="pb-4" src={process.env.SERVER_HOST + '/app_assets/images/santander_logo.png'} alt="" />
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <td>Banco</td>
                                            <td>Santander</td>
                                        </tr>
                                        <tr>
                                            <td>Resolución</td>
                                            <td><div className="approved-label">APROBADO</div></td>
                                        </tr>
                                        <tr>
                                            <td>Tasa de interés</td>
                                            <td>10.90%</td>
                                        </tr>
                                        <tr>
                                            <td>Plazo</td>
                                            <td>20 años</td>
                                        </tr>
                                        <tr>
                                            <td>Aforo</td>
                                            <td>90%</td>
                                        </tr>
                                        <tr>
                                            <td>Destino</td>
                                            <td>Adquisición Casa</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 ">
                                <div className="row mt-4" >
                                    <div className="form-group col-sm-12 col-lg-10 offset-lg-1" >
                                        <div className="text-center">
                                            <button onClick={this.handleContinueBtn} className="btn btn-green">Programar Avalúo {'>'}</button>
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

export default connect(mapStateToProps)(CreditAuthorization)
