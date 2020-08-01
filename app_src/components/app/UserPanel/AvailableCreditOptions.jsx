import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'


class Precalificador extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Precalificador - SwayLending"

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
                        <div className="breadcrumb-title mt-4">Pre-aprobación {'>'} <b>Carga de Documentos</b> {'>'} Propuestas {'>'} Solicitud {'>'} Autorización {'>'} Avalúo {'>'} Firma en Notaría</div>
                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Opciones disponibles</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>
                        <div className="page-description">
                            A continuación puedes ver todas las opciones disponibles en nuestro Market Place, sin embargo debes de enviar la documentación
                            requerida para someterla a análisis, y enviarte las propuestas óptimas para tu perfil.
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-12 col-md-6 col-lg-6 ">

                                <table className="table">
                                    <thead>
                                        <img className="pb-4" src={process.env.SERVER_HOST + '/app_assets/images/santander_logo.png'} alt="" />
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <td>Banco</td>
                                            <td>Santander</td>
                                        </tr>
                                        <tr>
                                            <td>Rando de tasas</td>
                                            <td>7.45% anual a 11.90% anual</td>
                                        </tr>
                                        <tr>
                                            <td>Plazo</td>
                                            <td>5 a 20 años</td>
                                        </tr>
                                        <tr>
                                            <td>Aforo máximo</td>
                                            <td>90% sobre el valor de avalúo</td>
                                        </tr>
                                        <tr>
                                            <td>Mensualidades</td>
                                            <td>$19,000.00 a $25,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>Destinos disponibles</td>
                                            <td>Compra de casa o depto, Compra de Terreno, Loquidez, Remodelación</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr/>
                                <table className="table mt-4">
                                    <thead>
                                        <img className="pb-4" src={process.env.SERVER_HOST + '/app_assets/images/santander_logo.png'} alt="" />
                                    </thead>
                                    <tbody >
                                        <tr>
                                            <td>Banco</td>
                                            <td>Santander</td>
                                        </tr>
                                        <tr>
                                            <td>Rando de tasas</td>
                                            <td>7.45% anual a 11.90% anual</td>
                                        </tr>
                                        <tr>
                                            <td>Plazo</td>
                                            <td>5 a 20 años</td>
                                        </tr>
                                        <tr>
                                            <td>Aforo máximo</td>
                                            <td>90% sobre el valor de avalúo</td>
                                        </tr>
                                        <tr>
                                            <td>Mensualidades</td>
                                            <td>$19,000.00 a $25,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>Destinos disponibles</td>
                                            <td>Compra de casa o depto, Compra de Terreno, Loquidez, Remodelación</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-6 ">
                                <div className="row mt-4">
                                    <div className="form-group col-sm-12 col-lg-10 offset-lg-1">
                                        <div className="input-prefix">Monto</div>
                                        <CurrencyInput prefix="$" precision="0" value={this.state.monthlyIncome} onChangeEvent={this.handleMonthlyIncomeChange} className={this.state.monthlyIncomeIsInvalid ? 'form-control input-underline is-invalid' : 'form-control input-underline'} />
                                        <div className="invalid-feedback">Este campo es obligatorio.</div>
                                        <div className="form-group text-left mt-4" >
                                            <button onClick={this.handleContinueBtn} className="btn btn-green">Siguiente {'>'}</button>
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

export default connect(mapStateToProps)(Precalificador)
