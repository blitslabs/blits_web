import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { getUserDetails, updateUserDetails, changeUserPassword, getUserVehicle, updateUserVehicle, getServiceVehicles } from '../../utils/api'

class EditDriver extends Component {

    state = {
        userId: '',
        name: '',
        email: '',
        phone: '',
        pictureData: '',
        pictureId: '',
        serviceVehicles: '',
        serviceVehicleId: '',
        vehiclePlates: '',
        vehicleModel: '',
        serverMsg: '',
        serverStatus: '',
        password: '',
        rpassword: '',
        serverMsg2: '',
        serverStatus2: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Conductor"
        const { token } = this.props
        const { userId } = this.props.match.params

        getUserDetails({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    getUserVehicle({ userId, token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                console.log(res2)
                                this.setState({
                                    userId,
                                    name: res.payload.name,
                                    email: res.payload.email,
                                    phone: res.payload.phone,
                                    pictureId: res.payload.pictureId,
                                    serviceVehicleId: res2.payload != null ? res2.payload.serviceVehicleId : '',
                                    vehiclePlates: res2.payload != null ? res2.payload.vehiclePlates : '',
                                    vehicleModel: res2.payload != null ? res2.payload.vehicleModel : '',
                                    loading: false
                                })
                            }
                        })
                }
            })

        getServiceVehicles({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ serviceVehicles: res.payload })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { userId, name, email, phone, pictureData, serviceVehicleId, vehiclePlates, vehicleModel } = this.state
        const { token } = this.props

        if (!name || !email || !phone) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        if (!serviceVehicleId) {
            toast.error('Selecciona un vehículo de servicio', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Selecciona un vehículo de servicio', serverStatus: 'ERROR' })
            return
        }

        if (!vehiclePlates) {
            toast.error('Ingresa las placas del vehículo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa las placas del vehículo', serverStatus: 'ERROR' })
            return
        }

        if (!vehicleModel) {
            toast.error('Ingresa el modelo del vehículo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa el modelo del vehículo', serverStatus: 'ERROR' })
            return
        }

        updateUserDetails({ userId, name, email, phone, pictureData, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    updateUserVehicle({
                        userId,
                        serviceVehicleId,
                        vehiclePlates,
                        vehicleModel,
                        token
                    })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                toast.success('Conductor actualizado correctamente', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                                this.setState({
                                    name: '',
                                    email: '',
                                    password: '',
                                    rpassword: '',
                                    phone: '',
                                    pictureData: '',
                                    serviceVehicleId: '',
                                    vehiclePlates: '',
                                    vehicleModel: '',
                                    serverMsg: 'Conductor actualizado correctamente',
                                    serverStatus: 'OK'
                                })
                            }
                        })
                } else {
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ serverMsg: res.message, serverStatus: 'ERROR' })
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realizar la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realizar la acción', serverStatus: 'ERROR' })
            })
    }

    handleChangePasswordBtn = (e) => {
        e.preventDefault()
        const { userId, password, rpassword } = this.state
        const { token } = this.props

        if (!userId || !password || !rpassword) {
            this.setState({ serverMsg2: 'Ingresa todos los campos requeridos', serverStatus2: 'ERROR' })
            return
        }

        if (password !== rpassword) {
            this.setState({ serverMsg2: 'Las contraseñas ingresadas no coinciden', serverStatus2: 'ERROR' })
            return
        }

        changeUserPassword({ userId, password, rpassword, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        password: '',
                        rpassword: '',
                        serverMsg2: res.message,
                        serverStatus2: 'OK'
                    })
                } else {
                    this.setState({
                        serverMsg2: res.message,
                        serverStatus2: 'ERROR'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    serverMsg2: 'Ocurrió un error al intentar realizar la acción',
                    serverStatus2: 'ERROR'
                })
            })
    }

    handleCancelPasswordChangeBtn = (e) => {
        e.preventDefault()
        this.setState({
            password: '',
            rpassword: ''
        })
    }

    nameChange = (e) => this.setState({ name: e.target.value })
    emailChange = (e) => this.setState({ email: e.target.value })
    phoneChange = (e) => this.setState({ phone: e.target.value })
    pictureDataChange = (data) => this.setState({ pictureData: data })
    serviceVehicleIdChange = (e) => this.setState({ serviceVehicleId: e.target.value })
    vehiclePlatesChange = (e) => this.setState({ vehiclePlates: e.target.value })
    vehicleModelChange = (e) => this.setState({ vehicleModel: e.target.value })

    passwordChange = (e) => this.setState({ password: e.target.value })
    rpasswordChange = (e) => this.setState({ rpassword: e.target.value })

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    render() {
        const { serverMsg, serverStatus, serverMsg2, serverStatus2, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/drivers`}>Conductores</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Editar Conductor</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label >Nombre</label>
                                                <input value={this.state.name} onChange={this.nameChange} type="text" className="form-control" autoComplete="off" placeholder="Nombre" />
                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input value={this.state.email} onChange={this.emailChange} type="email" className="form-control" placeholder="Email" />
                                            </div>

                                            <div className="form-group">
                                                <label >Teléfono celular</label>
                                                <input value={this.state.phone} onChange={this.phoneChange} type="text" className="form-control" autoComplete="off" placeholder="Teléfono celular" />
                                            </div>

                                            <div className="form-group">
                                                <label>Vehículo</label>
                                                <select value={this.state.serviceVehicleId} onChange={this.serviceVehicleIdChange}>
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
                                                <label >Placas del vehículo</label>
                                                <input value={this.state.vehiclePlates} onChange={this.vehiclePlatesChange} type="text" className="form-control" autoComplete="off" placeholder="Placas del vehículo" />
                                            </div>

                                            <div className="form-group">
                                                <label >Modelo del vehículo</label>
                                                <input value={this.state.vehicleModel} onChange={this.vehicleModelChange} type="text" className="form-control" autoComplete="off" placeholder="Modelo del vehículo" />
                                            </div>

                                            <div className="form-group">
                                                <label>Imagen</label>
                                                <img style={{ height: '100px', display: 'block', marginBottom: '10px' }} src={`${process.env.API_HOST}/picture/${this.state.pictureId}`} />
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>


                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Conductor</button>
                                            <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 col-sm-12 grin-margin ">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Cambiar Contraseña</h6>
                                    <form className="forms-sample">
                                        {
                                            serverMsg2
                                            &&
                                            <div className={serverStatus2 === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                {serverMsg2}
                                            </div>
                                        }
                                        <div className="form-group">
                                            <label>Contraseña</label>
                                            <input value={this.state.password} onChange={this.passwordChange} type="password" className="form-control" autoComplete="off" placeholder="Contraseña" />
                                        </div>
                                        <div className="form-group">
                                            <label>Repetir Contraseña</label>
                                            <input value={this.state.rpassword} onChange={this.rpasswordChange} type="password" className="form-control" autoComplete="off" placeholder="Repetir Contraseña" />
                                        </div>
                                        <button onClick={this.handleChangePasswordBtn} className="btn btn-primary mr-2">Actualizar Contraseña</button>
                                        <button onClick={this.handleCancelPasswordChangeBtn} className="btn btn-light">Cancelar</button>
                                    </form>
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
export default connect(mapStateToProps)(EditDriver)
