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

// API
import { getUserWallets } from '../../utils/api'

class Wallets extends Component {

    state = {
        wallets: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Wallets"
        const { token, dispatch } = this.props
        let { accountType, page } = this.props.match.params
        page = page ? page : 1

        getUserWallets({ accountType, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        wallets: res.payload,
                        loading: false,
                        pages: res.pages,
                        page
                    })
                }
            })
    }

    render() {
        const { wallets, loading, pages, page } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Wallets</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Wallets</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="usersTable"
                                            filename="users"
                                            sheet="users"
                                            buttonText="Excel"
                                        />
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="usersTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre</td>
                                                    <td>Email</td>
                                                    <td>Teléfono</td>
                                                    <td>Balance (Available)</td>
                                                    <td>Balance (Locked)</td>
                                                    <td>Divisa</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    wallets && wallets.length > 0
                                                        ?
                                                        wallets.map((user, index) => (
                                                            <tr key={index}>
                                                                <td>{user.id}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.phone}</td>
                                                                <td>${parseFloat(user.balances[0].available)}</td>
                                                                <td>${parseFloat(user.balances[0].locked)}</td>
                                                                <td>{user.balances[0].currency}</td>
                                                                <td>
                                                                    <Link to={`/admin/user/${user.id}/wallet`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
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
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination url={'/admin/wallets'} pages={pages} page={page} />
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
export default connect(mapStateToProps)(Wallets)
