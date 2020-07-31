import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getWithdrawRequestsByStatus, getWithdrawRequest, approveWithdrawRequest, approveAllWithdrawRequests } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment'

class WithdrawRequests extends Component {

    state = {
        withdrawRequests: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Peticiones de Retiro de Fondos"
        const { token } = this.props
        let { status, page } = this.props.match.params
        page = page ? parseFloat(page) : 1


        getWithdrawRequestsByStatus({ status, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        withdrawRequests: res.payload,
                        pages: res.pages,
                        loading: false,
                    })
                }
            })
    }

    handleApproveBtn = (requestId) => {
        const { token } = this.props
        const { withdrawRequests } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres aprobar la petición de retiro?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        approveWithdrawRequest({ requestId, token })
                        this.setState({
                            withdrawRequests: withdrawRequests.filter(w => w.id !== requestId)
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

    handleApproveAllBtn = () => {
        const { token } = this.props
        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres aprobar todas las peticiones de retiro?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        approveAllWithdrawRequests({ token })
                        this.setState({
                            withdrawRequests: []
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
        const { withdrawRequests, loading } = this.state
        let { status, page } = this.props.match.params
        page = page ? parseFloat(page) : 1

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Peticiones de Retiro</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{status}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Peticiones de Retiro</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="withdrawRequestsTable"
                                            filename="pending-witdraw-requests"
                                            sheet="withdraw-requests"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleApproveAllBtn} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><i className="fa fa-check btn-icon"></i> Aprobar todos</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="withdrawRequestsTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Titular</th>
                                                    <th>Número Cuenta</th>
                                                    <th>Banco</th>
                                                    <th>ID Paypal</th>
                                                    <th>Tipo Cuenta</th>
                                                    <th>Cantidad</th>
                                                    <th>Fecha</th>
                                                    <th>Status</th>
                                                    {
                                                        status === 'PENDING'
                                                            ? <th>Acción</th>
                                                            : null
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    withdrawRequests && withdrawRequests.length > 0
                                                        ?
                                                        withdrawRequests.map((withdrawRequest, index) => (
                                                            <tr key={index}>
                                                                <td>{withdrawRequest.id}</td>
                                                                <td>{withdrawRequest.account.accountName != null ? withdrawRequest.account.accountName : '-'}</td>
                                                                <td>{withdrawRequest.account.accountNumber != null ? withdrawRequest.account.accountNumber : '-'}</td>
                                                                <td>{withdrawRequest.account.bankName != null ? withdrawRequest.account.bankName : '-'}</td>
                                                                <td>{withdrawRequest.account.paypalId != null ? withdrawRequest.account.paypalId : '-'}</td>
                                                                <td>{withdrawRequest.account.accountType}</td>
                                                                <td>${parseFloat(withdrawRequest.amount)} {withdrawRequest.currency}</td>
                                                                <td>{moment(withdrawRequest.createdAt).format('DD/MM/YY HH:mm')}</td>
                                                                <td>{withdrawRequest.status}</td>
                                                                <td>
                                                                    {
                                                                        status === 'PENDING'
                                                                            ?
                                                                            <button onClick={(e) => { e.preventDefault(); this.handleApproveBtn(withdrawRequest.id); }} type="button" className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-check btn-icon"></i> Aprobar</button>
                                                                            :
                                                                            null
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
export default connect(mapStateToProps)(WithdrawRequests)
