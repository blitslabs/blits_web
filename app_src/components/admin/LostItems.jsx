import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getLostItems, deleteServiceFarePlan } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PlusCircle } from 'react-feather';


class LostItems extends Component {

    state = {
        lostItems: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Objetos Perdidos"
        const { token } = this.props

        getLostItems({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, lostItems: res.payload })
                }
            })
    }

    render() {
        const { lostItems, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Objetos olvidados</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Objetos Olvidados</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="lostItemsTable"
                                            filename="lostItems"
                                            sheet="lostItems"
                                            buttonText="Excel"
                                        />
                                        
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="lostItemsTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre (Usuario)</td>
                                                    <td>Email</td>
                                                    <td>Teléfono</td>
                                                    <td>Objeto Perdido</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    lostItems && lostItems.length > 0
                                                        ?
                                                        lostItems.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.id}</td>
                                                                <td>{item.user.name}</td>
                                                                <td>{item.user.email}</td>
                                                                <td>{item.user.phone}</td>
                                                                <td>{item.itemDescription}</td>
                                                                
                                                                <td>
                                                                    <Link to={`/admin/lostItem/${item.id}`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
                                                                    
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
export default connect(mapStateToProps)(LostItems)
