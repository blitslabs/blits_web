import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import Pagination from './Pagination'
import MyDateRange from './MyDateRange'

// API
import { getRidesByStatusAndPage, getRidesByStatusAndDateRangeAndPage, getGlobalStatementStatsByPeriod, getGlobalStatementStatsByRange } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { PlusCircle } from 'react-feather';
import moment from 'moment'




class Revenue extends Component {

    state = {
        rides: '',
        globalStats: '',
        startDate: new Date(),
        endDate: new Date(),
        showDateRange: false,
        loading: true
    }

    componentDidMount() {
        document.title = "Ingresos"
        const { token } = this.props
        let { period, page } = this.props.match.params
        page = page ? page : 1
        let startDate, endDate

        if (period === 'day') {
            startDate = moment().subtract('1', 'days').toDate()
            endDate = moment().toDate()
        } else if (period === 'week') {
            startDate = moment().subtract('7', 'days').toDate()
            endDate = moment().toDate()
        } else if (period === 'month') {
            startDate = moment().subtract('30', 'days').toDate()
            endDate = moment().toDate()
        } else if (period === 'year') {
            startDate = moment().subtract('365', 'days').toDate()
            endDate = moment().toDate()
        } else {
            startDate = moment().subtract('10', 'years').toDate()
            endDate = moment().toDate()
        }

        getRidesByStatusAndPage({ status: 'COMPLETED', page, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    getGlobalStatementStatsByPeriod({ period, token })
                        .then(data => data.json())
                        .then((res2) => {
                            this.setState({
                                rides: res.payload,
                                page: page,
                                pages: res.pages,
                                period,
                                periodTitle: period === 'all' ? 'Todos' : period === 'day' ? 'Día' : period === 'month' ? 'Mensual' : 'Anual',
                                globalStats: res2.payload,
                                startDate,
                                endDate,
                                loading: false
                            })
                        })
                }
            })
    }

    handleSelectDateRange = (range) => {
        
        const { token } = this.props
        let { period, page } = this.props.match.params
        page = page ? page : 1
        this.setState({ startDate: range.selection.startDate, endDate: range.selection.endDate })
        getRidesByStatusAndDateRangeAndPage({ status: 'COMPLETED', startDate: range.selection.startDate, endDate: range.selection.endDate, page, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    getGlobalStatementStatsByRange({ period, token })
                        .then(data => data.json())
                        .then((res2) => {
                            this.setState({
                                rides: res.payload,
                                page: page,
                                pages: res.pages,
                                period,
                                periodTitle: period === 'all' ? 'Todos' : period === 'day' ? 'Día' : period === 'month' ? 'Mensual' : 'Anual',
                                globalStats: res2.payload,                                
                                loading: false
                            })
                        })
                }
            })
    }

    handleToggleDateRange = (value) => this.setState({ showDateRange: value })


    render() {
        const { rides, globalStats, page, pages, period, periodTitle, loading } = this.state
        
        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Finanzas</a></li>
                            <li className="breadcrumb-item " aria-current="page">Periodo </li>
                            <li className="breadcrumb-item active" aria-current="page">{periodTitle}</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#10b759', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Viajes</h5>
                                    <h5 className="mb-1">{this.state.globalStats.totalRides}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ingresos</h5>
                                    <h5 className="mb-1">${this.state.globalStats.totalRevenue}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(233, 30, 99)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Comisión</h5>
                                    <h5 className="mb-1">${this.state.globalStats.totalComission}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: '#10b759', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Total Ganancias</h5>
                                    <h5 className="mb-1">${this.state.globalStats.totalEarnings}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-xs-12">
                            <div style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', fontSize: '14px', lineHeight: '1.428571429', fontFamily: '"Open Sans", sans-serif', boxSizing: 'border-box', outline: 'none !important', marginBottom: '1.5rem!important', color: '#fff', background: 'rgb(0, 123, 255)', position: 'relative', display: 'block', boxShadow: '0 0px 6px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', padding: '1.25rem' }}>
                                <div className="t-content">
                                    <h5 className="text-uppercase mb-1">Viajes Cancelados</h5>
                                    <h5 className="mb-1">{this.state.globalStats.totalCancelledRides}</h5>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="row mt-3">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Finanzas del periodo ({periodTitle})</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="ridesTable"
                                            filename="rides"
                                            sheet="rides"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", }}>
                                            {
                                                this.state.showDateRange ?
                                                    <div style={{ position: 'absolute', right: '10px', border: '1px solid #e1e4e8', zIndex: 1 }}>
                                                        <MyDateRange
                                                            startDate={this.state.startDate}
                                                            endDate={this.state.endDate}
                                                            handleSelectDateRange={this.handleSelectDateRange}
                                                            handleToggleDateRange={this.handleToggleDateRange}
                                                        />
                                                    </div>
                                                    :
                                                    <button onClick={() => this.handleToggleDateRange(true)} className="btn btn-light">{moment(this.state.startDate).format('DD/MM/YY')} - {moment(this.state.endDate).format('DD/MM/YY')}</button>
                                            }
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="ridesTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Dirección de Inicio</th>
                                                    <th>Dirección de Finalización</th>
                                                    <th>Comisión</th>
                                                    <th>Descuento</th>
                                                    <th>Fecha y Hora</th>
                                                    <th>Estado</th>
                                                    <th>Ganancias</th>

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
                                                                <td>${parseFloat(r.transaction.total) - parseFloat(r.transaction.discount) - parseFloat(r.transaction.comission)}</td>

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
                                    <Pagination url={`/admin/revenue/${period}`} pages={pages} page={page} />
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
export default connect(mapStateToProps)(Revenue)
