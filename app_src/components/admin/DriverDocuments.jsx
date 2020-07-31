import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getUserDocuments, updateDocumentStatus, getUserVehicle, deleteUserVehicle, getServiceVehicles, updateUserVehicle } from '../../utils/api'

// Libraries
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class DriverDocuments extends Component {

    state = {
        documents: '',
        userVehicle: '',
        userId: '',
        serviceVehicleId: '',
        serviceVehicles: '',
        vehiclePlates: '',
        vehicleModel: '',
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Documentos del Conductor"
        const { token, dispatch } = this.props
        let { userId } = this.props.match.params

        getUserDocuments({ userId, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, documents: res.payload })
                }
            })
    }

    handleRejectBtn = (documentId) => {
        const { token } = this.props
        const { documents } = this.state

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
                                        documents: documents.map((d) => {
                                            if (d.id === documentId) {
                                                d.status = 'REJECTED'
                                            }
                                            return d
                                        })
                                    })
                                }
                            })
                        this.setState({
                            documents: documents.filter(d => d.id !== documentId)
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
        const { documents, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Conductor</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Documentos</li>
                        </ol>
                    </nav>
                    <div className="row mt-4">
                        <div className="col-md-12 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Documentos del Conductor</h6>
                                        <div className="table-responsive">
                                            <table className="table table-hover" >
                                                <thead>
                                                    <tr>
                                                        <th>Documento</th>
                                                        <th>Nombre</th>
                                                        <th>Estado</th>
                                                        <th>Fecha de Expiración</th>
                                                        <th>Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        documents && documents.length > 0
                                                            ?
                                                            documents.map((d, i) => (
                                                                <tr key={i}>
                                                                    <td>{d.documentType}</td>
                                                                    <td>{d.name}</td>
                                                                    <td>{d.status}</td>
                                                                    <td>{d.expDate !== null ? moment(d.expDate).format('DD/MM/YY HH:mm') : 'N/A'}</td>
                                                                    <td>
                                                                        <Link to={`/admin/document/${d.id}/`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i> Ver</Link>
                                                                        <Link to={`/admin/document/${d.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i> Editar</Link>
                                                                        {
                                                                            d.status !== 'REJECTED' &&
                                                                            <button onClick={e => { e.preventDefault(); this.handleRejectBtn(d.id); }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-close btn-icon"></i> Rechazar</button>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ))
                                                            :
                                                            <tr>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                            </tr>
                                                    }
                                                </tbody>
                                            </table>
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
export default connect(mapStateToProps)(DriverDocuments)
