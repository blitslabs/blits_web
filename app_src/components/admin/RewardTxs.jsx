import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getRewardTxs } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment'



class RewardTxs extends Component {

    state = {
        rewardTxs: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Registros de Recompensas"
        const { token } = this.props
        let { page } = this.props.match.params
        page = page ? page : 1

        getRewardTxs({ page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ rewardTxs: res.payload, loading: false })
                }
            })
    }

    render() {
        const { rewardTxs, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Recompensas a Usuarios</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Registros de Recompensas otorgadas a Usuarios</h6>

                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="rewardTxsTable"
                                            filename="reward_txs"
                                            sheet="reward_txs"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}

                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="rewardTxsTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Usuario (Nombre)</td>
                                                    <td>Detalles del Viaje</td>
                                                    <td>Fecha y Hora</td>
                                                    <td>Puntos ganados</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    rewardTxs && rewardTxs.length > 0
                                                        ?
                                                        rewardTxs.map((tx, index) => (
                                                            <tr key={index}>
                                                                <td>{tx.id}</td>
                                                                <td>{tx.user.name}</td>
                                                                <td>{tx.rideId}</td>
                                                                <th>{moment(tx.createdAt).format('DD/MM/YY HH:mm')}</th>
                                                                <td>{parseFloat(tx.points)}</td>
                                                                <td>
                                                                    <Link to={`/admin/ride/${tx.rideId}`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
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
export default connect(mapStateToProps)(RewardTxs)
