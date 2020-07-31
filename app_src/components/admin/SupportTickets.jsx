import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getSupportTickets } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PlusCircle } from 'react-feather';


class SupportTickets extends Component {

    state = {
        tickets: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Tickets de Soporte"
        const { token } = this.props
        let { status, page } = this.props.match.params
        status = status === 'open' ? 'ACTIVE' : 'COMPLETED'
        page = page ? page : 1

        getSupportTickets({ status, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, status, tickets: res.payload })
                }
            })
    }


    render() {
        const { tickets, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Tickets</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{this.state.status === 'open' ? 'Abiertos' : 'Cerrados'}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Tickets de Soporte {this.state.status === 'open' ? 'Abiertos' : 'Cerrados'}</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="ticketsTable"
                                            filename="tickets"
                                            sheet="tickets"
                                            buttonText="Excel"
                                        />
                                        
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="ticketsTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre</td>
                                                    <td>Email</td>
                                                    <td>Título</td>
                                                    <td>Mensaje</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tickets && tickets.length > 0
                                                        ?
                                                        tickets.map((t, index) => (
                                                            <tr key={index}>
                                                                <td>{t.id}</td>
                                                                <td>{t.user.name}</td>
                                                                <td>{t.user.email}</td>
                                                                <td>{t.title}</td>
                                                                <td>{t.message}</td>                                                                                                                          
                                                                <td>
                                                                    <Link to={`/admin/supportTicket/${t.id}`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>                                                                   
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
export default connect(mapStateToProps)(SupportTickets)
