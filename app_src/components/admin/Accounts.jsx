import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getAccountsByStatus, deleteAccount, approveAccount } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Accounts extends Component {

    state = {
        accounts: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Cuentas"
        const { token } = this.props
        let { status, page } = this.props.match.params
        page = page ? parseFloat(page) : 1


        getAccountsByStatus({ status, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        accounts: res.payload,
                        pages: res.pages,
                        loading: false,
                    })
                }
            })
    }

    handleApproveBtn = (accountId) => {
        const { token } = this.props
        const { accounts } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres aprobar la cuenta?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        approveAccount({ accountId, token })
                        this.setState({
                            accounts: accounts.filter(a => a.id !== accountId)
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

    handleDeleteAccountBtn = (accountId) => {
        const { token } = this.props
        const { accounts } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar la cuenta?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deleteAccount({ accountId, token })
                        this.setState({
                            accounts: accounts.filter(a => a.id !== accountId)
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
        const { accounts, loading } = this.state
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
                            <li className="breadcrumb-item"><a href="#">Cuentas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{status}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Cuentas</h6>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Titular</th>
                                                    <th>Banco</th>
                                                    <th>Número de Cuenta</th>
                                                    <th>Número de Ruta</th>
                                                    <th>Tipo de Cuenta</th>
                                                    <th>ID Paypal</th>
                                                    <th>Estado</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    accounts && accounts.length > 0
                                                        ?
                                                        accounts.map((account, index) => (
                                                            <tr key={index}>
                                                                <td>{account.id}</td>
                                                                <td>{account.accountName}</td>
                                                                <td>{account.bankName}</td>
                                                                <td>{account.accountNumber}</td>
                                                                <td>{account.routingNumber != null ? account.routingNumber : '-'}</td>
                                                                <td>{account.accountType != null ? account.accountType : '-'}</td>
                                                                <td>{account.paypalId != null ? account.paypalId : '-'}</td>
                                                                <td>{account.status}</td>
                                                                <td>
                                                                    {
                                                                        status === 'PENDING'
                                                                            ?
                                                                            <button onClick={(e) => { e.preventDefault(); this.handleApproveBtn(account.id); }} type="button" className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-check btn-icon"></i> Aprobar</button>
                                                                            :
                                                                            <Fragment>
                                                                                <Link to={`/admin/account/${account.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                                <button onClick={(e) => { e.preventDefault(); this.handleDeleteAccountBtn(account.id); }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
                                                                            </Fragment>
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
export default connect(mapStateToProps)(Accounts)
