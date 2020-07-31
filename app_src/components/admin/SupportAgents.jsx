import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

// API
import { getAllUsersByType, deleteUser } from '../../utils/api'

class SupportAgents extends Component {

    state = {
        users: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Agentes de Soporte"
        const { token, dispatch } = this.props
        let { page } = this.props.match.params
        page = page ? page : 1

        getAllUsersByType({ token, accountType: 'SUPPORT', page })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
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
            message: '¿Estás seguro que quieres eliminar al agente de soporte?',
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
                            <li className="breadcrumb-item"><a href="#">Soporte</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>
                    
                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Agentes de Soporte</h6>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre</td>
                                                    <td>Email</td>
                                                    <td>Teléfono</td>                                                   
                                                    <td>Acción</td>
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
                                                                <td>
                                                                    <Link to={`/admin/user/${user.id}/`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
                                                                    <Link to={`/admin/user/${user.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteUser(user.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
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
export default connect(mapStateToProps)(SupportAgents)
