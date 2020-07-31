import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getVehicleMappingDetails, updateVehicleMapping, getServiceVehicles, getServiceFarePlans, getZones } from '../../utils/api'

class EditVehicleMapping extends Component {

    state = {
        serviceVehicleId: '',
        serviceFareId: '',
        zoneId: '',
        description: '',
        serviceVehicles: '',
        serviceFarePlans: '',
        zones: '',
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount = () => {
        document.title = "Editar Vinculación de Vehículo"
        const { token } = this.props
        const { vehicleMappingId } = this.props.match.params
        let vehicleMapping, serviceVehicles, serviceFarePlans, zones

        vehicleMapping = getVehicleMappingDetails({ vehicleMappingId, token })
        serviceVehicles = getServiceVehicles({ token })
        serviceFarePlans = getServiceFarePlans({ token })
        zones = getZones({ token })

        Promise.all([vehicleMapping, serviceVehicles, serviceFarePlans, zones])
            .then(async ([vehicleMapping, serviceVehicles, serviceFarePlans, zones]) => {
                vehicleMapping = await vehicleMapping.json()
                serviceVehicles = await serviceVehicles.json()
                serviceFarePlans = await serviceFarePlans.json()
                zones = await zones.json()
                
                this.setState({
                    serviceVehicleId: vehicleMapping.payload.serviceVehicleId,
                    serviceFareId: vehicleMapping.payload.serviceFareId,
                    zoneId: vehicleMapping.payload.zoneId,
                    description: vehicleMapping.payload.description,
                    serviceVehicles: serviceVehicles.payload,
                    serviceFarePlans: serviceFarePlans.payload,
                    zones: zones.payload,
                    loading: false
                })
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { serviceVehicleId, serviceFareId, zoneId, description } = this.state
        const { token } = this.props
        const { vehicleMappingId } = this.props.match.params

        if (!vehicleMappingId || !serviceVehicleId || !serviceFareId || !zoneId || !description) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateVehicleMapping({ vehicleMappingId, serviceVehicleId, serviceFareId, zoneId, description, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.messsage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        serviceVehicleId: '',
                        serviceFareId: '',
                        zoneId: '',
                        description: '',
                        serverMsg: res.message,
                        serverStatus: 'OK'
                    })
                } else {
                    toast.error(res.messsage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ serverMsg: res.messsage, serverStatus: 'ERROR' })
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realización la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realización la acción', serverStatus: 'ERROR' })
            })
    }

    handleServiceVehicleChange = (e) => this.setState({ serviceVehicleId: e.target.value })
    handleServiceFareChange = (e) => this.setState({ serviceFareId: e.target.value })
    handleZoneChange = (e) => this.setState({ zoneId: e.target.value })
    handleDescriptionChange = (e) => this.setState({ description: e.target.value })

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    render() {
        const {
            serviceVehicleId, serviceFareId, zoneId, description,
            serviceVehicles, serviceFarePlans, zones, serverMsg, serverStatus, loading
        } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/vehicleMappings`}>Vínculación  Vehículos</Link></li>
                            <li className="breadcrumb-item " aria-current="page">Actualizar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Actualizar Vehículo Vehículo - Tarifa - Zona</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Vehículo de Servicio</label>
                                                <select value={serviceVehicleId} onChange={this.handleServiceVehicleChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    {
                                                        serviceVehicles && serviceVehicles.length > 0
                                                            ?
                                                            serviceVehicles.map((v, i) => (
                                                                <option key={i} value={v.id}>{v.vehicleName}</option>
                                                            ))
                                                            : null
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Plan Tarifario</label>
                                                <select value={serviceFareId} onChange={this.handleServiceFareChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    {
                                                        serviceFarePlans && serviceFarePlans.length > 0
                                                            ?
                                                            serviceFarePlans.map((s, i) => (
                                                                <option key={i} value={s.id}>{s.farePlanName}</option>
                                                            ))
                                                            : null
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Zona</label>
                                                <select value={zoneId} onChange={this.handleZoneChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    {
                                                        zones && zones.length > 0
                                                            ?
                                                            zones.map((z, i) => (
                                                                <option key={i} value={z.id}>{z.name}</option>
                                                            ))
                                                            : null
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Descripción</label>
                                                <input value={description} onChange={this.handleDescriptionChange} type="text" className="form-control" autoComplete="off" placeholder="Descripción" />
                                            </div>

                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Vínculación</button>
                                            <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                        </form>
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
export default connect(mapStateToProps)(EditVehicleMapping)
