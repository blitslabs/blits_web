import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'
import DropZone from '../DropZone'

class ClientRecords extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Expedientes | Partherner - SwayLending"

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

                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Expedientes</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>

                        <div className="row mt-4">
                            <div className="col-sm-12">

                                {/* Datos Generales Start */}
                                <div>
                                    <div className="form-title">Datos generales</div>
                                    <div className="form-title-separator-black"></div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12 col-md-6">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Cliente</td>
                                                        <td>Irene Misalem Potenciado Marini</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Estatus</td>
                                                        <td>Captura de datos complementarios</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Subproceso</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pre-evaluación</td>
                                                        <td>pre-aprobado</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Resolución</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Vigencia crédito</td>
                                                        <td>-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Producto</td>
                                                        <td>Adquisición Tradicional</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Esquema</td>
                                                        <td>Pagos Fijos</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Plazo</td>
                                                        <td>20 años</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Entidad Financiera</td>
                                                        <td>Banco Santander</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Monto Autorizado</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Monto dispuesto</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Valor compra venta</td>
                                                        <td>-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Valor avalúo</td>
                                                        <td>-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* Datos Generales End */}

                                {/* Estructura Comercial Start */}
                                <div>
                                    <div className="form-title">Estructura Comercial</div>
                                    <div className="form-title-separator-black"></div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12 col-md-6">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Canal</td>
                                                        <td>Parthner</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Parthner</td>
                                                        <td>Diana Isabela Cruz García</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SD Regional</td>
                                                        <td>José Alberto Cruz García</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-sm-12 col-md-6">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Asesor Hipotecario</td>
                                                        <td>Eduardo García Montero</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* Estructura Comercial End */}

                                {/* Solicitud Digital Start */}
                                <div className="mb-4">
                                    <div className="form-title">Solicitud Digital</div>
                                    <div className="form-title-separator-black"></div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12 col-md-6">
                                            <div className="underline-text-btn">Ver solicitud digital</div>
                                        </div>

                                    </div>
                                </div>
                                {/* Solicitud Digital End */}

                                {/* Expediente Digital Start */}
                                <div className="mt-5">
                                    <div className="form-title">Expediente Digital</div>
                                    <div className="form-title-separator-black"></div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12">
                                            <table className="table table-responsive">
                                                <thead>
                                                    <tr>
                                                        <th>Documento</th>
                                                        <th>Nombre archivo</th>
                                                        <th>Interviniente</th>
                                                        <th>Fecha de Carga</th>
                                                        <th className="download-btn">Descargar todo en ZIP</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Identificación</td>
                                                        <td>INE.pdf</td>
                                                        <td>Juan Pérez</td>
                                                        <td>15/07/2020</td>
                                                        <td className="download-btn">Descargar</td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* Expediente Digital End */}

                                {/* Historial / Bitacora Start */}
                                <div className="mt-4">
                                    <div className="form-title">Historial / Bitácora</div>
                                    <div className="form-title-separator-black"></div>
                                    <div className="row mt-4">
                                        <div className="col-sm-12">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Acción</th>
                                                        <th>Interviniente</th>
                                                        <th>Fecha</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Pre-evaluación</td>
                                                        <td>Juan Péres</td>
                                                        <td>15/07/2020</td>
                                                        
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* Historial / Bitacora End */}


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

export default connect(mapStateToProps)(ClientRecords)
