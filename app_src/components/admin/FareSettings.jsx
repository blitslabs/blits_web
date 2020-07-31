import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getServiceFarePlans, deleteServiceFarePlan } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PlusCircle } from 'react-feather';


class FareSettings extends Component {

    state = {
        serviceFarePlans: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Configuración de Tarifas"
        const { token } = this.props

        getServiceFarePlans({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, serviceFarePlans: res.payload })
                }
            })
    }

    handleAddServiceFarePlan = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addServiceFarePlan')
    }

    handleDeleteServiceFarePlan = (serviceFareId) => {
        const { token } = this.props
        const { serviceFarePlans } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar el plan tarifario?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deleteServiceFarePlan({ serviceFareId, token })
                        this.setState({
                            serviceFarePlans: serviceFarePlans.filter(s => s.id !== serviceFareId)
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
        const { serviceFarePlans, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Planes Tarifarios</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Planes Tarifarios</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="serviceFarePlansTable"
                                            filename="service_fare_plans"
                                            sheet="service_fare_plans"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddServiceFarePlan} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Plan Tarifario</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="serviceFarePlansTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre del Plan Tarifario</td>
                                                    <td>Desde Km</td>
                                                    <td>Hasta Km</td>
                                                    <td>Precio por Km</td>
                                                    <td>Precio por Minuto de Espera</td>
                                                    <td>Hora Pico</td>
                                                    <td>Tarifa Nocturna</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    serviceFarePlans && serviceFarePlans.length > 0
                                                        ?
                                                        serviceFarePlans.map((plan, index) => (
                                                            <tr key={index}>
                                                                <td>{plan.id}</td>
                                                                <td>{plan.farePlanName}</td>
                                                                <td>{plan.startKm}</td>
                                                                <td>{plan.upToKm}</td>
                                                                <td>{plan.pricePerKm}</td>
                                                                <td>{plan.waitingPricePerMinute}</td>
                                                                <td>{plan.applyPeakFare}</td>
                                                                <td>{plan.applyNightFare}</td>                                                                
                                                                <td>
                                                                    <Link to={`/admin/serviceFarePlan/${plan.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteServiceFarePlan(plan.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
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
export default connect(mapStateToProps)(FareSettings)
