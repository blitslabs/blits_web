import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'
import Pagination from './Pagination'

// API
import { getTxs } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment'

class Txs extends Component {

    state = {
        txs: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Transacciones"
        const { token } = this.props
        let { page } = this.props.match.params
        page = page ? page : 1

        getTxs({ page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    this.setState({ loading: false, txs: res.payload, pages: res.pages, page })
                }
            })
    }



    render() {
        const { txs, loading, pages, page } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Historial de Pagos</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Historial de Pagos</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="txsTable"
                                            filename="txs"
                                            sheet="txs"
                                            buttonText="Excel"
                                        />

                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="txsTable">
                                            <thead>
                                                <tr>
                                                    <th>Tx ID</th>
                                                    <th>Viaje (ID)</th>
                                                    <th>Usuario (Nombre)</th>
                                                    <th>Conductor (Nombre)</th>
                                                    <th>Total</th>
                                                    <th>Método de Pago</th>
                                                    <th>Estado del Pago</th>
                                                    <th>Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    txs && txs.length > 0
                                                        ?
                                                        txs.map((tx, index) => (
                                                            <tr key={index}>
                                                                <td>{tx.id}</td>
                                                                <td><Link to={'/admin/ride/' + tx.rideId }>{tx.rideId}</Link></td>
                                                                <td><Link to={'/admin/user/' + tx.user.id + '/edit'}>{tx.user.name}</Link></td>
                                                                <td><Link to={'/admin/driver/' + tx.driver.id + '/edit'}>{tx.driver.name}</Link></td>
                                                                <td>${tx.total} {tx.currency}</td>
                                                                <td>{tx.paymentMethod.name}</td>
                                                                <td>{tx.status}</td>
                                                                <td>{moment(tx.createdAt).format('DD/MM/YY HH:mm')}</td>
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
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination url={'/admin/txs'} pages={pages} page={page} />
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
export default connect(mapStateToProps)(Txs)
