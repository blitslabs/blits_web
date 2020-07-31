import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import Pagination from './Pagination'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css}
import { PlusCircle } from 'react-feather';

// API
import { getAllUsersByType, deleteUser, getRequiredDocumentsByAccountType, updateDriverDocumentsStatus, getDriversStats, updateUserStatus } from '../../utils/api'

class Drivers extends Component {

    state = {
        users: '',
        requiredDocuments: '',
        stats: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Conductores"
        const { token } = this.props
        let { page } = this.props.match.params
        page = page ? page : 1

        getAllUsersByType({ token, accountType: 'DRIVER', page })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    getRequiredDocumentsByAccountType({ accountType: 'DRIVER', token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                this.setState({ loading: false, users: res.payload, requiredDocuments: res2.payload, pages: res.pages, page })
                            }
                        })
                }
            })

        getDriversStats({ token })
            .then(data => data.json())
            .then((res) => {
                if(res.status === 'OK') {
                    this.setState({ stats: res.payload })
                }
            })
    }

    handleDeleteUser = (userId) => {
        const { token } = this.props
        const { users } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar al usuario?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deleteUser({ userId, token })
                        this.setState({
                            users: users.filter(u => u.id !== userId)
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

    handleDocumentsStatus = (userId, documentsStatus) => {
        const { token } = this.props
        const { users } = this.state
        updateDriverDocumentsStatus({ userId, documentsStatus, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.message)
                    this.setState({
                        users: users.map((u) => {
                            if (u.id === userId) {
                                u.documentsStatus = documentsStatus
                            }
                            return u
                        })
                    })
                }
            })
    }

    handleUpdateUserStatus = (userId, status) => {
        const { token } = this.props
        const { users } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres actualizar el estado de la cuenta?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        updateUserStatus({ userId, status, token })
                        this.setState({
                            users: users.map(u => {
                                if (u.id === userId) {
                                    u.status = status
                                    return u
                                }
                                return u
                            })
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

    handleAddDriver = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addDriver')
    }

    render() {
        const { users, loading, pages, page } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Conductores</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(16, 183, 89)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Conductores</h5>
                                    <h5 className="mb-1">{this.state.stats.totalDrivers}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#007bff', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Viajes</h5>
                                    <h5 className="mb-1">{this.state.stats.totalDrivers}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#ff3366', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Viajes Cancelados</h5>
                                    <h5 className="mb-1">{this.state.stats.totalCancelledRides}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Conductores</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="driversTable"
                                            filename="drivers"
                                            sheet="drivers"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddDriver} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Conductor</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="driversTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre</td>
                                                    <td>Email</td>
                                                    <td>Teléfono</td>
                                                    <td>Documentos</td>
                                                    <td>En Línea</td>
                                                    <td>Acción</td>
                                                    <td>Aprobar</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users && users.length > 0
                                                        ?
                                                        users.map((user, index) => (
                                                            <tr key={index}>
                                                                <td>{user.id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.phone}</td>
                                                                <td>{

                                                                    parseInt(this.state.requiredDocuments.length) - parseInt(user.documents.filter(d => d.status == 'COMPLETED').length) == 0
                                                                        ?
                                                                        <Link to={`/admin/driver/${user.id}/documents`} className="btn btn-success mb-1 mb-md-0 action-btn">{this.state.requiredDocuments.length + ' Completados'} </Link>
                                                                        :
                                                                        <Link to={`/admin/driver/${user.id}/documents`} className="btn btn-success mb-1 mb-md-0 action-btn">{`${parseInt(this.state.requiredDocuments.length) - parseInt(user.documents.filter(d => d.status == 'COMPLETED').length)} Pendientes`}</Link>

                                                                }</td>
                                                                <td>{user.onlineStatus}</td>
                                                                <td>

                                                                    <Link to={`/admin/userRides/${user.id}/`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
                                                                    <Link to={`/admin/driver/${user.id}/vehicles`} className="btn btn-warning mb-1 mb-md-0 action-btn"><i className="fa fa-car btn-icon"></i></Link>
                                                                    <Link to={`/admin/driver/${user.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    {
                                                                        user.status === 'ACTIVE'
                                                                            ?
                                                                            <button onClick={e => { e.preventDefault(); this.handleUpdateUserStatus(user.id, 'BANNED') }} type="button" className="btn btn-dark mb-1 mb-md-0 action-btn"><i className="fa fa-ban btn-icon"></i></button>
                                                                            :
                                                                            <button onClick={e => { e.preventDefault(); this.handleUpdateUserStatus(user.id, 'ACTIVE') }} type="button" className="btn btn-light mb-1 mb-md-0 action-btn"><i className="fa fa-check btn-icon"></i></button>
                                                                    }
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteUser(user.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        user.documentsStatus === 'PENDING' || user.documentsStatus === 'REJECTED'
                                                                            ?
                                                                            <button onClick={e => { e.preventDefault(); this.handleDocumentsStatus(user.id, 'APPROVED') }} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-check btn-icon"></i> Aprobar</button>
                                                                            :
                                                                            <button onClick={e => { e.preventDefault(); this.handleDocumentsStatus(user.id, 'REJECTED') }} className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-close btn-icon"></i> Rechazar</button>
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
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination url={'/admin/drivers'} pages={pages} page={page} />
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
export default connect(mapStateToProps)(Drivers)
