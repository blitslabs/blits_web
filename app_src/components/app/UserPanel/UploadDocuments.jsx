import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'
import DropZone from '../DropZone'

class UploadDocuments extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Carga de Documentos - SwayLending"

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
                            <div className="page-title mt-3 pt-3">Carga de Documentos</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>
                        <div className="page-description">
                            Sube una copia de los siguientes documentos, una vez cargada la documentación analizaremos la información para determinar la opción óptima
                            de acuerdo a tu perfil, recibirás las propuestas de hipoteca disponibles.
                        </div>
                        <div className="row mt-5">
                            <div className="col-sm-12 col-md-4 col-lg-4 ">
                                <div className="text-center">
                                    <div className="form-label mb-2">INE (FRONTAL)</div>
                                    <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                    
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4 ">
                                <div className="text-center">
                                    <div className="form-label mb-2">INE (POSTERIOR)</div>
                                    <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                    
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4 ">
                                <div className="text-center">
                                    <div className="form-label mb-2">ACTA DE NACIMIENTO</div>
                                    <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                   
                                </div>
                            </div>
                        </div>

                        <div className="row " style={{ marginTop: '60px' }}>
                            <div className="col-sm-12 col-md-4 col-lg-4 ">
                                <div className="text-center">
                                    <div className="form-label mb-2">COMPROBANTE DE DOMICILIO</div>
                                    <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                    
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4 ">
                                <div className="text-center">
                                    <div className="form-label mb-2">COMPROBANTE DE INGRESOS</div>
                                    <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                    
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12 text-center">
                                <div className="form-group text-left mt-4 text-center" >
                                    <button onClick={this.handleContinueBtn} className="btn btn-green">Enviar Documentación</button>
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

export default connect(mapStateToProps)(UploadDocuments)
