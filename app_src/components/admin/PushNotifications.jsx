import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getPushNotifications, deletePushNotification } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PlusCircle } from 'react-feather';


class PushNotifications extends Component {

    state = {
        pushNotifications: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Notificaciones Push"
        const { token } = this.props
        let { page } = this.props.match.params
        page = page ? page : 1

        getPushNotifications({ page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, pushNotifications: res.payload })
                }
            })
    }

    handleAddPushNotification = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addPushNotification')
    }

    handleDeletePushNotification = (notificationId) => {
        const { token } = this.props
        const { pushNotifications } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar la Notitificación?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deletePushNotification({ notificationId, token })
                        this.setState({
                            pushNotifications: pushNotifications.filter(p => p.id !== notificationId)
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
        const { pushNotifications, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Notificaciones Push</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todas</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Notificaciones Push</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="pushNotificationsTable"
                                            filename="push_notifications"
                                            sheet="push_notifications"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddPushNotification} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Notificación Push</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="pushNotificationsTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>                                                    
                                                    <td>Título</td>
                                                    <td>Texto del Mensaje</td>
                                                    <td>Tipo</td>
                                                    <td>Usuario Objetivo</td>
                                                    <td>Zona (ID)</td>
                                                    <td>Fecha de Expiración</td>                                                    
                                                    <td>Imagen</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    pushNotifications && pushNotifications.length > 0
                                                        ?
                                                        pushNotifications.map((notification, index) => (
                                                            <tr key={index}>
                                                                <td>{notification.id}</td>
                                                                <td>{notification.title}</td>
                                                                <td>{notification.message}</td>
                                                                <td>{notification.notificationType}</td>
                                                                <td>{notification.targetUser}</td>
                                                                <td>{notification.zoneId}</td>
                                                                <td>{notification.expDate}</td>
                                                                <td>
                                                                    <img src={`${process.env.API_HOST}/picture/${notification.pictureId}`} />
                                                                </td>
                                                                <td>                                                                    
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeletePushNotification(notification.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
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
            </DashboardTemplate>
        )
    }
}


function mapStateToProps({ auth }) {
    return {
        token: auth && auth.token,

    }
}
export default connect(mapStateToProps)(PushNotifications)
