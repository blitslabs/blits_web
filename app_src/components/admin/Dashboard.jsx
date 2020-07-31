import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import WelcomeBar from './WelcomeBar'
import MyPieChart from './MyPieChart'
import MyLineChart from './MyLineChart'
import Loading from '../Loading'

// API
import { getAdminData, getDashboardData } from '../../utils/api'

// Actions
import { saveUserData } from '../../actions/user'

// Libraries
import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer
} from 'recharts';




class Dashboard extends Component {

    state = {
        stats: '',
        ridesPieChartData: [
            { name: 'Completados', value: 40 },
            { name: 'Cancelados', value: 30 },
            { name: 'Activos', value: 30 }
        ],
        paymentMethodsPieChartData: [
            { name: 'Efectivo', value: 50 },
            { name: 'Tarjetas', value: 50 }
        ],
        ridesPerDayLineChartData: [
            { name: 'Lun', viajes: 1, },
            { name: 'Mar', viajes: 2, },
            { name: 'Mie', viajes: 1, },
            { name: 'Jue', viajes: 2, },
            { name: 'Vie', viajes: 1, },
            { name: 'Sab', viajes: 2, },
            { name: 'Dom', viajes: 1, },
        ],
        revenuePerDayLineChartData: [
            { name: 'Lun', viajes: 100, },
            { name: 'Mar', viajes: 200, },
            { name: 'Mie', viajes: 100, },
            { name: 'Jue', viajes: 200, },
            { name: 'Vie', viajes: 100, },
            { name: 'Sab', viajes: 200, },
            { name: 'Dom', viajes: 100, },
        ],
        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Dashboard"

        getAdminData({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    dispatch(saveUserData(res.payload))
                }
            })
            .catch(err => console.log(err))

        getDashboardData({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        loading: false,
                        stats: res.payload,
                        ridesPieChartData: [
                            { name: 'Completados', value: res.payload.totalCompletedRides },
                            { name: 'Cancelados', value: res.payload.totalCancelledRides },
                            { name: 'En curso', value: res.payload.totalOngoingRides }
                        ],
                        paymentMethodsPieChartData: [
                            { name: 'Efectivo', value: res.payload.cashTxs },
                            { name: 'Tarjetas', value: res.payload.cardTxs },
                        ],
                        ridesPerDayLineChartData: [
                            { name: 'Lun', viajes: res.payload.ridesPerDay.filter(d => d.day == 0)[0].total, },
                            { name: 'Mar', viajes: res.payload.ridesPerDay.filter(d => d.day == 1)[0].total, },
                            { name: 'Mie', viajes: res.payload.ridesPerDay.filter(d => d.day == 2)[0].total, },
                            { name: 'Jue', viajes: res.payload.ridesPerDay.filter(d => d.day == 3)[0].total, },
                            { name: 'Vie', viajes: res.payload.ridesPerDay.filter(d => d.day == 4)[0].total, },
                            { name: 'Sab', viajes: res.payload.ridesPerDay.filter(d => d.day == 5)[0].total, },
                            { name: 'Dom', viajes: res.payload.ridesPerDay.filter(d => d.day == 6)[0].total, },
                        ],
                        revenuePerDayLineChartData: [
                            { name: 'Lun', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 0)[0].total), },
                            { name: 'Mar', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 1)[0].total), },
                            { name: 'Mie', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 2)[0].total), },
                            { name: 'Jue', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 3)[0].total), },
                            { name: 'Vie', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 4)[0].total), },
                            { name: 'Sab', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 5)[0].total), },
                            { name: 'Dom', ingresos: parseFloat(res.payload.revenuePerDay.filter(d => d.day == 6)[0].total), },
                        ],
                    })
                }
            })
    }

    render() {

        const { stats, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background:'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Usuarios</h5>
                                    <h5 className="mb-1">{stats.totalUsers}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Conductores</h5>
                                    <h5 className="mb-1">{stats.totalDrivers}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Usuarios Hoy</h5>
                                    <h5 className="mb-1">{stats.totalRides}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Viajes Completados</h5>
                                    <h5 className="mb-1">{stats.totalCompletedRides}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(233, 30, 99)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Viajes Canelados</h5>
                                    <h5 className="mb-1">{stats.totalCancelledRides}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Viajes Agendados</h5>
                                    <h5 className="mb-1">{stats.totalScheduledRides}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#10b759', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ingresos</h5>
                                    <h5 className="mb-1">${parseFloat(stats.totalRevenue)} MXN</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#10b759', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ganancias</h5>
                                    <h5 className="mb-1">${parseFloat(stats.totalEarnings)} MXN</h5>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#f59345', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ganancias</h5>
                                    <h5 className="mb-1">${parseFloat(stats.totalEarnings)} MXN</h5>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6>Viajes</h6>
                                    <div style={{ marginTop: '5px' }}>
                                        <label style={{ marginRight: '20px' }}><i className="fa fa-circle" style={{ color: '#007bff' }}></i> Completados</label>
                                        <label style={{ marginRight: '20px' }}><i className="fa fa-circle" style={{ color: '#E91E63' }}></i> Cancelados</label>
                                        <label><i className="fa fa-circle" style={{ color: '#46c35f' }}></i> En curso</label>
                                    </div>
                                    <MyPieChart data={this.state.ridesPieChartData} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6>Métodos de Pago</h6>
                                    <div style={{ marginTop: '5px' }}>
                                        <label style={{ marginRight: '20px' }}><i className="fa fa-circle" style={{ color: '#007bff' }}></i> Efectivo</label>
                                        <label style={{ marginRight: '20px' }}><i className="fa fa-circle" style={{ color: '#E91E63' }}></i> Tarjetas de Crédito / Débito</label>

                                    </div>
                                    <MyPieChart data={this.state.paymentMethodsPieChartData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 style={{ marginBottom: '15px' }}>Viajes por Día</h6>
                                    <MyLineChart data={this.state.ridesPerDayLineChartData} dataType="viajes" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 style={{ marginBottom: '15px' }}>Ingresos por Día (MXN)</h6>
                                    <MyLineChart data={this.state.revenuePerDayLineChartData} dataType="ingresos" />
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
        token: auth && auth.token
    }
}

export default connect(mapStateToProps)(Dashboard)
