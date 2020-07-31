import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getUserWalletDetails } from '../../utils/api'

// Libraries
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


class UserWallet extends Component {

    state = {
        wallet: '',
        loading: true,
    }

    componentDidMount() {
        const { token } = this.props
        const { userId } = this.props.match.params
        document.title = `Wallet Usuario ${userId}`
        getUserWalletDetails({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    this.setState({ wallet: res.payload, loading: false })
                }
            })
    }

    render() {
        const { wallet, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Wallet</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Usuario</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Nombre</h5>
                                    <h5 className="mb-1">{wallet.name}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Email</h5>
                                    <h5 className="mb-1">{wallet.email}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Tipo Cuenta</h5>
                                    <h5 className="mb-1">{wallet.accountType}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Balance (Available)</h5>
                                    <h5 className="mb-1">${wallet.balances.available} {wallet.balances.currency}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Balance (Locked)</h5>
                                    <h5 className="mb-1">${wallet.balances.locked} {wallet.balances.currency}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Txs</h5>
                                    <h5 className="mb-1">{wallet.txs.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Detalles del Monedero Electrónico</h6>
                                    <div className="row">
                                        <div className="col-md-12 col-xs-12 col-sm-12">
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <td>ID</td>
                                                            <td>Viaje (ID)</td>
                                                            <td>Cliente (ID)</td>
                                                            <td>Conductor (ID)</td>
                                                            <td>Operación</td>
                                                            <td>Método de Pago</td>
                                                            <td>Total</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.wallet && this.state.wallet.txs && this.state.wallet.txs.length > 0
                                                                ?
                                                                this.state.wallet.txs.map((tx, i) => (
                                                                    <tr key={i}>
                                                                        <td>{tx.id}</td>
                                                                        <td><Link to={'/admin/ride/' + tx.rideId}>{tx.rideId}</Link></td>
                                                                        <td><Link to={`/admin/user/${tx.userId}/edit`}>{tx.userId}</Link></td>
                                                                        <td><Link to={`/admin/user/${tx.driverId}/edit`}>{tx.driverId}</Link></td>
                                                                        <td>{tx.operation}</td>
                                                                        <td>{tx.paymentMethod.name}</td>
                                                                        <td>${parseFloat(tx.total)} {tx.currency}</td>
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
                                        </div>
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
export default connect(mapStateToProps)(UserWallet)