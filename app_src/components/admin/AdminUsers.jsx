import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import Pagination from './Pagination'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css}
import { PlusCircle } from 'react-feather';
import moment from 'moment'

// API
import { getAdminUsers, deleteAdminUser } from '../../utils/api'

class AdminUsers extends Component {

    state = {
        users: '',
        stats: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Administradores"
        const { token, dispatch } = this.props


        getAdminUsers({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, users: res.payload })
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
                        deleteAdminUser({ userId, token })
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

    handleAddUser = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addAdminUser')
    }

    render() {
        const { users, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Administradores</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Administradores</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="usersTable"
                                            filename="users"
                                            sheet="users"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddUser} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Usuario</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="usersTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre</td>
                                                    <td>Email</td>
                                                    <td>Teléfono</td>
                                                    <td>Acción</td>
                                                    <td>Estado</td>
                                                    <td>Fecha de creación</td>
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
                                                                <td>{user.status}</td>
                                                                <td>{moment(user.createdAt).format('DD/MM/YY HH:mm')}</td>
                                                                <td>
                                                                    <Link to={`/admin/adminuser/${user.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i> Editar permisos</Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteUser(user.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i> Eliminar usuario</button>
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
            </DashboardTemplate>
        )
    }
}


function mapStateToProps({ auth }) {
    return {
        token: auth && auth.token,

    }
}
export default connect(mapStateToProps)(AdminUsers)
