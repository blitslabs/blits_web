import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getUserDetails, getUserRidesByPage, deleteRide, getDriverStats } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { PlusCircle } from 'react-feather';
import moment from 'moment';


class DriverFinance extends Component {

    state = {
        rides: '',
        driver: '',
        totalRevenue: 0,
        totalComission: 0,
        totalEarnings: 0,
        totalRides: 0,
        totalCancelledRides: 0,
        loading: true
    }

    componentDidMount() {
        document.title = "Finanzas del Conductor"
        const { token } = this.props
        let { userId, page } = this.props.match.params
        page = page ? page : 1

        getUserDetails({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ driver: res.payload })
                }
            })

        getUserRidesByPage({ userId, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, rides: res.payload, page, pages: res.pages, userId })
                }
            })

        getDriverStats({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if(res.status === 'OK') {
                    this.setState({
                        totalRevenue: res.payload.totalRevenue,
                        totalComission: res.payload.totalComission,
                        totalEarnings: res.payload.totalEarnings,
                        totalRides: res.payload.totalRides,
                        totalCancelledRides: res.payload.totalCancelledRides,
                    })
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
        const { rides, driver, page, pages, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Viajes</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Usuario {this.state.userId}</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#43b968', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Viajes</h5>
                                    <h5 className="mb-1">{this.state.totalRides}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#3e70c9', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ingresos</h5>
                                    <h5 className="mb-1">{this.state.totalRevenue}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#f59345', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Comisión</h5>
                                    <h5 className="mb-1">{this.state.totalComission}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#43b968', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ganancias</h5>
                                    <h5 className="mb-1">{this.state.totalEarnings}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#3e70c9', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Viajes Cancelados</h5>
                                    <h5 className="mb-1">{this.state.totalCancelledRides}</h5>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-3">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Resumen de la cuenta de {driver.name}</h6>
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
                                                    <td>Dirección de Inicio</td>
                                                    <td>Dirección de Finalización</td>
                                                    <td>Comisión</td>
                                                    <td>Descuento</td>
                                                    <td>Fecha y Hora</td>
                                                    <td>Estado</td>
                                                    <td>Ganancias</td>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    rides && rides.length > 0
                                                        ?
                                                        rides.map((r, index) => (
                                                            <tr key={index}>
                                                                <td>{r.id}</td>
                                                                <td>{r.startAddress}</td>
                                                                <td>{r.endAddress}</td>
                                                                <td>${parseFloat(r.transaction.comission)}</td>
                                                                <td>${parseFloat(r.transaction.discount)}</td>
                                                                <td>{moment(r.createdAt).fromNow().toString()}</td>
                                                                <td>{r.transaction.status}</td>
                                                                <td>${parseFloat(r.transaction.total) - parseFloat(r.transaction.discount) - parseFloat(r.transaction.comission) }</td>
                                                                <td>
                                                                    <Link to={`/admin/ride/${r.id}`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteRide(r.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
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
export default connect(mapStateToProps)(DriverFinance)
