import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getVehicleMappings, deleteVehicleMapping } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PlusCircle } from 'react-feather';


class VehicleMapping extends Component {

    state = {
        vehicleMappings: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Vínculación de Vehículos"
        const { token } = this.props

        getVehicleMappings({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, vehicleMappings: res.payload })
                }
            })
    }

    handleAddVehicleMapping = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addVehicleMapping')
    }

    handleDeleteVehicleMapping = (vehicleMappingId) => {
        const { token } = this.props
        const { vehicleMappings } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar el mapeo de vehículo?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deleteVehicleMapping({ vehicleMappingId, token })
                        this.setState({
                            vehicleMappings: vehicleMappings.filter(v => v.id !== vehicleMappingId)
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
        const { vehicleMappings, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Vínculación de Vehículos</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Vinculación de Vehículos - Tarifas - Zonas</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="serviceVehiclesTable"
                                            filename="service_vehicles"
                                            sheet="service_vehicles"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddVehicleMapping} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Vinculación</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="serviceVehiclesTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Plan Tarifario</td>
                                                    <td>Vehículo de Servicio</td>
                                                    <td>Zona</td>
                                                    <td>Estado</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    vehicleMappings && vehicleMappings.length > 0
                                                        ?
                                                        vehicleMappings.map((v, index) => (
                                                            <tr key={index}>
                                                                <td>{v.id}</td>
                                                                <td>{v.serviceFare.farePlanName}</td>
                                                                <td>{v.serviceVehicle.vehicleName}</td>
                                                                <td>{v.zone.name}</td>
                                                                <td>{v.status}</td>   
                                                                <td>
                                                                    <Link to={`/admin/vehicleMapping/${v.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteVehicleMapping(v.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
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
export default connect(mapStateToProps)(VehicleMapping)
