import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getRidesByStatusAndPage, deleteRide } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { PlusCircle } from 'react-feather';
import moment from 'moment';


class ScheduledRides extends Component {

    state = {
        rides: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Viajes Programados"
        const { token, dispatch } = this.props
        let { page } = this.props.match.params
        page = page ? page : 1
        const status = 'SCHEDULED'        

        getRidesByStatusAndPage({ status, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, rides: res.payload, status, page, pages: res.pages })
                }
            })
    }

    handleDeleteRide = (rideId) => {
        const { token } = this.props
        const { rides } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar el viaje?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deleteRide({ rideId, token })
                        this.setState({
                            rides: rides.filter(r => r.id !== rideId)
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
        const { rides, status, page, pages, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Viajes</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{status}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Viajes</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="ridesTable"
                                            filename="rides"
                                            sheet="rides"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." />

                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="ridesTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Usuario</td>
                                                    <td>Conductor/Proveedor</td>
                                                    <td>Fecha Programada</td>
                                                    <td>Estado</td>                                                    
                                                    <td>Método de Pago</td>
                                                    <td>Estado del Pago</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    rides && rides.length > 0
                                                        ?
                                                        rides.map((r, index) => (
                                                            <tr key={index}>
                                                                <td>{r.id}</td>
                                                                <td>{r.user.name}</td>
                                                                <td>{ r.driver === null ? 'N/A' : r.driver.name}</td>
                                                                <td>{moment(r.scheduledTime).fromNow().toString()}</td>
                                                                <td>{r.status}</td>                                                               
                                                                <td>{r.transaction.paymentMethod.name}</td>
                                                                <td>{r.transaction.status}</td>
                                                                <td>
                                                                    <Link to={`/admin/scheduled-ride/${r.id}`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
                                                                    <Link to={`/admin/scheduled-ride/${r.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    
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
export default connect(mapStateToProps)(ScheduledRides)
