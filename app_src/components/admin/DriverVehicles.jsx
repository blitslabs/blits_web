import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getUserVehicle, deleteUserVehicle, getServiceVehicles, updateUserVehicle } from '../../utils/api'

// Libraries
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

class DriverVehicles extends Component {

    state = {
        userVehicle: '',
        userId: '',
        serviceVehicleId: '',
        serviceVehicles: '',
        vehiclePlates: '',
        vehicleModel: '',
        vehicleColor: '',
        vehicleOwner: '',
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Documentos del Conductor"
        const { token, dispatch } = this.props
        let { userId } = this.props.match.params


        getUserVehicle({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, userId, userVehicle: res.payload })
                }
            })

        getServiceVehicles({ token })
            .then(data => data.json())
            .then(res => {
                if (res.status === 'OK') {
                    this.setState({ serviceVehicles: res.payload })
                    return
                }
            })

    }

    handleUpdateUserVehicleBtn = (e) => {
        e.preventDefault()
        const { token } = this.props
        const { userId, serviceVehicleId, vehiclePlates, vehicleModel, vehicleColor, vehicleOwner } = this.state

        if (!userId || !serviceVehicleId || !vehiclePlates || !vehicleModel || !vehicleColor || !vehicleOwner) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateUserVehicle({
            userId,
            serviceVehicleId,
            vehiclePlates,
            vehicleModel,
            vehicleColor,
            vehicleOwner,
            token
        })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    getUserVehicle({ userId, token })
                        .then(data => data.json())
                        .then((res2) => {
                            toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                            this.setState({
                                userVehicle: res2.payload,
                                serverMsg: res.message,
                                serverStatus: 'OK'
                            })
                        })
                } else {
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        serverMsg: res.message,
                        serverStatus: 'ERROR'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realizar la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({
                    serverMsg: 'Ocurrió un error al intentar realizar la acción',
                    serverStatus: 'ERROR'
                })
            })
    }

    handleDeleteUserVehicle = (userVehicleId) => {
        const { token } = this.props

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar el vehículo?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deleteUserVehicle({ userVehicleId, token })
                            .then(data => data.json())
                            .then((res) => {
                                if (res.status === 'OK') {
                                    this.setState({
                                        userVehicle: ''
                                    })
                                }
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



    serviceVehicleChange = (e) => this.setState({ serviceVehicleId: e.target.value })
    vehiclePlatesChange = (e) => this.setState({ vehiclePlates: e.target.value })
    vehicleModelChange = (e) => this.setState({ vehicleModel: e.target.value })
    vehicleColorChange = (e) => this.setState({ vehicleColor: e.target.value })
    vehicleOwnerChange = (e) => this.setState({ vehicleOwner: e.target.value })

    render() {
        const { userVehicle, serverMsg, serverStatus, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Conductor</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Vehículos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-4 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Agregar Vehículo</h6>

                                    {
                                        serverMsg
                                        &&
                                        <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                            {serverMsg}
                                        </div>
                                    }

                                    <div className="form-group">
                                        <select value={this.serviceVehicleId} onChange={this.serviceVehicleChange}>
                                            <option value="" >Seleccionar opción</option>
                                            {
                                                this.state.serviceVehicles && this.state.serviceVehicles.length > 0
                                                    ?
                                                    this.state.serviceVehicles.map((v, i) => (
                                                        <option key={i} value={v.id}>{v.vehicleName}</option>
                                                    ))
                                                    : null
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.vehiclePlates} onChange={this.vehiclePlatesChange} type="text" className="form-control" autoComplete="off" placeholder="Placas" />
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.vehicleModel} onChange={this.vehicleModelChange} type="text" className="form-control" autoComplete="off" placeholder="Modelo" />
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.vehicleColor} onChange={this.vehicleColorChange} type="text" className="form-control" autoComplete="off" placeholder="Color" />
                                    </div>
                                    <div className="form-group">
                                        <input value={this.state.vehicleOwner} onChange={this.vehicleOwnerChange} type="text" className="form-control" autoComplete="off" placeholder="Nombre del propietario del vehículo" />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={this.handleUpdateUserVehicleBtn} className="btn btn-primary mr-2">Actualizar Vehículo</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Asignación de Vehículo</h6>
                                        <div className="table-responsive">
                                            <table className="table table-hover" >
                                                <thead>
                                                    <tr>
                                                        <th>Vehículo (Nombre)</th>
                                                        <th>Placas</th>
                                                        <th>Modelo</th>
                                                        <th>Color</th>
                                                        <th>Propietario</th>
                                                        <th>Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        userVehicle
                                                            ?
                                                            <tr>
                                                                <td>{userVehicle.serviceVehicle.vehicleName}</td>
                                                                <td>{userVehicle.vehiclePlates}</td>
                                                                <td>{userVehicle.vehicleModel}</td>
                                                                <td>{userVehicle.vehicleColor}</td>
                                                                <td>{userVehicle.vehicleOwner}</td>
                                                                <td>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteUserVehicle(userVehicle.id); }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-close btn-icon"></i> Eliminar</button>
                                                                </td>
                                                            </tr>
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
export default connect(mapStateToProps)(DriverVehicles)
