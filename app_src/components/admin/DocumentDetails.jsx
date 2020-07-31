import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getDocumentDetails, updateDocumentStatus } from '../../utils/api'

// Libraries
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


class DocumentDetails extends Component {

    state = {
        document: '',
        serverMsg: '',
        serverStatus: '',
        loading: true,
    }

    componentDidMount() {
        document.title = "Detalles del Documento"
        const { token } = this.props
        const { documentId } = this.props.match.params
        getDocumentDetails({ documentId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    this.setState({ document: res.payload, loading: false })
                }
            })
    }


    handleApproveBtn = (documentId) => {
        const { token } = this.props

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres aprobar el documento?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        updateDocumentStatus({ documentId, documentStatus: 'APPROVED', token })
                            .then(data => data.json())
                            .then((res) => {
                                if (res.status === 'OK') {
                                    this.setState({
                                        document: {
                                            ...this.state.document,
                                            status: 'APPROVED'
                                        },
                                        serverMsg: res.message,
                                        serverStatus: 'OK'
                                    })
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    handleRejectBtn = (documentId) => {
        const { token } = this.props

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres rechazar el documento?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        updateDocumentStatus({ documentId, documentStatus: 'REJECTED', token })
                            .then(data => data.json())
                            .then((res) => {
                                if (res.status === 'OK') {
                                    this.setState({
                                        document: {
                                            ...this.state.document,
                                            status: 'REJECTED'
                                        },
                                        serverMsg: res.message,
                                        serverStatus: 'OK'
                                    })
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    handleUnreadableBtn = (documentId) => {
        const { token } = this.props

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres marcar el documento como ilegible?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        updateDocumentStatus({ documentId, documentStatus: 'UNREADABLE', token })
                            .then(data => data.json())
                            .then((res) => {
                                if (res.status === 'OK') {
                                    this.setState({
                                        document: {
                                            ...this.state.document,
                                            status: 'UNREADABLE'
                                        },
                                        serverMsg: res.message,
                                        serverStatus: 'OK'
                                    })
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    render() {
        const { document, serverMsg, serverStatus, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Documentos</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{document.id}</li>
                        </ol>
                    </nav>
                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Detalles del Documento</h6>
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12 col-sm-12">
                                            <div className="table-responsive">
                                                {
                                                    serverMsg
                                                    &&
                                                    <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                        {serverMsg}
                                                    </div>
                                                }
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <td>Campo</td>
                                                            <td>Valor</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Usuario (ID)</td>
                                                            <td>{document ? document.user.id : '-'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Usuario (Nombre)</td>
                                                            <td>{document ? document.user.name : '-'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Documento (Nombre)</td>
                                                            <td>{document ? document.name : '-'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tipo</td>
                                                            <td>{document ? document.documentType : '-'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Fecha de Expiración</td>
                                                            <td>{document && document.expDate !== null ? moment(document.expDate).format('DD/MM/YY HH:mm') : 'N/A'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Estado</td>
                                                            <td>{document ? document.status : '-'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div style={{ marginTop: '20px' }}>
                                                    <button onClick={e => { e.preventDefault(); this.handleApproveBtn(document.id); }} type="button" className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-check btn-icon"></i> Aprobar</button>
                                                    <button onClick={e => { e.preventDefault(); this.handleRejectBtn(document.id); }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-close btn-icon"></i> Rechazar</button>
                                                    <button onClick={e => { e.preventDefault(); this.handleUnreadableBtn(document.id); }} type="button" className="btn btn-warning mb-1 mb-md-0 action-btn"><i className="fa fa-close btn-icon"></i> Ilegible</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xs-12 col-sm-12" >
                                            <div>
                                                <img style={{ height: '100%', display: 'block', marginBottom: '10px' }} src={`${process.env.API_HOST}/picture/${document.pictureId}`} />
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

function mapStateToProps({ auth }) {
    return {
        token: auth && auth.token,
    }
}
export default connect(mapStateToProps)(DocumentDetails)