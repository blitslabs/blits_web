import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'
import DatePicker from 'react-date-picker';



// API
import { createUser, updateUserVehicle, getServiceVehicles } from '../../utils/api'

class AddDriver extends Component {

    state = {
        name: '',
        lastName: '',
        motherLastName: '',
        rfc: '',
        dateOfBirth: '',
        gender: '',
        street: '',
        interiorNumber: '',
        exteriorNumber: '',
        settlement: '',
        municipality: '',
        postalCode: '',
        email: '',
        password: '',
        rpassword: '',
        phone: '',
        pictureData: '',
        serviceVehicleId: '',
        vehiclePlates: '',
        vehicleModel: '',
        vehicleColor: '',
        vehicleOwner: '',
        serviceVehicles: '',
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        const { token } = this.props
        document.title = "Añadir Conductor"
        getServiceVehicles({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ serviceVehicles: res.payload, loading: false })
                }
            })
    }

    nameChange = (e) => this.setState({ name: e.target.value })
    lastNameChange = (e) => this.setState({ lastName: e.target.value })
    motherLastNameChange = (e) => this.setState({ motherLastName: e.target.value })
    rfcChange = (e) => this.setState({ rfc: e.target.value })
    dateOfBirthChange = (date) => this.setState({ dateOfBirth: date })
    genderChange = (e) => this.setState({ gender: e.target.value })
    streetChange = (e) => this.setState({ street: e.target.value })
    interiorNumberChange = (e) => this.setState({ interiorNumber: e.target.value })
    exteriorNumberChange = (e) => this.setState({ exteriorNumber: e.target.value })
    settlementChange = (e) => this.setState({ settlement: e.target.value })
    municipalityChange = (e) => this.setState({ municipality: e.target.value })
    postalCodeChange = (e) => this.setState({ postalCode: e.target.value })
    emailChange = (e) => this.setState({ email: e.target.value })
    passwordChange = (e) => this.setState({ password: e.target.value })
    rpasswordChange = (e) => this.setState({ rpassword: e.target.value })
    phoneChange = (e) => this.setState({ phone: e.target.value })
    serviceVehicleIdChange = (e) => this.setState({ serviceVehicleId: e.target.value })
    pictureDataChange = (data) => this.setState({ pictureData: data })
    vehiclePlatesChange = (e) => this.setState({ vehiclePlates: e.target.value })
    vehicleModelChange = (e) => this.setState({ vehicleModel: e.target.value })
    vehicleColorChange = (e) => this.setState({ vehicleColor: e.target.value })
    vehicleOwnerChange = (e) => this.setState({ vehicleOwner: e.target.value })

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { token } = this.props
        const { 
            name, lastName, motherLastName, email, password, rpassword, phone, pictureData, 
            rfc, dateOfBirth, gender, street, interiorNumber, exteriorNumber, settlement, municipality, postalCode,
            serviceVehicleId, vehiclePlates, vehicleModel, vehicleColor, vehicleOwner,
        
        } = this.state

        if (!name) {
            toast.error('Ingresa un nombre válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un nombre válido', serverStatus: 'ERROR' })
            return
        }

        if (!lastName) {
            toast.error('Ingresa un apellido paterno válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un apellido paterno válido', serverStatus: 'ERROR' })
            return
        }

        if (!motherLastName) {
            toast.error('Ingresa un apellido materno válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un apellido materno válido', serverStatus: 'ERROR' })
            return
        }

        if (!email) {
            toast.error('Ingresa un email válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un email válido', serverStatus: 'ERROR' })
            return
        }

        if (!password || !rpassword) {
            toast.error('Ingresa una contraseña válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa una contraseña válida', serverStatus: 'ERROR' })
            return
        }

        if (password !== rpassword) {
            toast.error('Las contraseñas ingresadas no coinciden', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Las contraseñas ingresadas no coinciden', serverStatus: 'ERROR' })
            return
        }

        if (!phone) {
            toast.error('Ingresa un teléfono válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un teléfono válido', serverStatus: 'ERROR' })
            return
        }

        if (!rfc) {
            toast.error('Ingresa un RFC válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un RFC válido', serverStatus: 'ERROR' })
            return
        }

        if (!dateOfBirth) {
            toast.error('Ingresa un teléfono válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa una fecha de nacimiento válida', serverStatus: 'ERROR' })
            return
        }

        if (!gender) {
            toast.error('Selecciona el género del conductor', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Selecciona el género del conductor', serverStatus: 'ERROR' })
            return
        }

        if (!street) {
            toast.error('Ingresa una calle válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa una calle válida', serverStatus: 'ERROR' })
            return
        }

        if (!interiorNumber) {
            toast.error('Ingresa un número interior válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un número interior válido', serverStatus: 'ERROR' })
            return
        }

        if (!exteriorNumber) {
            toast.error('Ingresa un número exterior válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un número exterior válido', serverStatus: 'ERROR' })
            return
        }

        if (!settlement) {
            toast.error('Ingresa una colonia válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa una colonia válida', serverStatus: 'ERROR' })
            return
        }

        if (!municipality) {
            toast.error('Ingresa un municipio válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un municipio válido', serverStatus: 'ERROR' })
            return
        }

        if (!postalCode) {
            toast.error('Ingresa un código postal válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un código postal válido', serverStatus: 'ERROR' })
            return
        }

        if (!serviceVehicleId) {
            toast.error('Selecciona un vehículo de servicio', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Selecciona un vehículo de servicio', serverStatus: 'ERROR' })
            return
        }

        if (!vehiclePlates) {
            toast.error('Ingresa las placas del vehículo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa las placas del vehículo', serverStatus: 'ERROR' })
            return
        }

        if (!vehicleModel) {
            toast.error('Ingresa el modelo del vehículo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa el modelo del vehículo', serverStatus: 'ERROR' })
            return
        }

        if (!vehicleColor) {
            toast.error('Ingresa el color del vehículo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa el color del vehículo', serverStatus: 'ERROR' })
            return
        }

        if (!vehicleOwner) {
            toast.error('Ingresa el propietario del vehículo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa el propietario del vehículo', serverStatus: 'ERROR' })
            return
        }

        createUser({
            name, email, phone, password, rpassword,
            pictureData, accountType: 'DRIVER', token,
            rfc, dateOfBirth, gender, street, interiorNumber, 
            exteriorNumber, settlement, municipality, postalCode
        })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    const user = res.payload
                    console.log(user)
                    updateUserVehicle({
                        userId: user.id,
                        serviceVehicleId,
                        vehiclePlates,
                        vehicleModel,
                        vehicleColor,
                        vehicleOwner,
                        token
                    })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
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
                                    serverMsg: 'Conductor creado correctamente',
                                    serverStatus: 'OK'
                                })
                                toast.success('Conductor creado correctamente', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                            }
                        })
                } else {
                    this.setState({ serverMsg: res.message, serverStatus: 'ERROR' })
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({ serverMsg: 'Ocurrió un error al intentar realizar la acción', serverStatus: 'ERROR' })
                toast.error('Ocurrió un error al intentar realizar la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            })

    }

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    render() {
        const { serverMsg, serverStatus, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/drivers`}>Conductores</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Crear</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Crear Conductor</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Nombre</label>
                                                <input value={this.state.name} onChange={this.nameChange} type="text" className="form-control" id="exampleInputUsername1" autoComplete="off" placeholder="Nombre" />
                                            </div>
                                            <div className="form-group">
                                                <label>Apellido Paterno</label>
                                                <input value={this.state.lastName} onChange={this.lastNameChange} type="text" className="form-control" id="exampleInputUsername1" autoComplete="off" placeholder="Nombre" />
                                            </div>
                                            <div className="form-group">
                                                <label>Apellido Materno</label>
                                                <input value={this.state.motherLastName} onChange={this.motherLastNameChange} type="text" className="form-control" id="exampleInputUsername1" autoComplete="off" placeholder="Nombre" />
                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input value={this.state.email} onChange={this.emailChange} type="email" className="form-control" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <label>Contraseña</label>
                                                <input value={this.state.password} onChange={this.passwordChange} type="password" className="form-control" autoComplete="off" placeholder="Contraseña" />
                                            </div>
                                            <div className="form-group">
                                                <label>Repetir Contraseña</label>
                                                <input value={this.state.rpassword} onChange={this.rpasswordChange} type="password" className="form-control" autoComplete="off" placeholder="Repetir Contraseña" />
                                            </div>
                                            <div className="form-group">
                                                <label>Teléfono celular</label>
                                                <input value={this.state.phone} onChange={this.phoneChange} type="number" className="form-control" autoComplete="off" placeholder="Teléfono celular" />
                                            </div>
                                            <div className="form-group">
                                                <label>RFC</label>
                                                <input value={this.state.rfc} onChange={this.rfcChange} type="text" className="form-control" autoComplete="off" placeholder="RFC" />
                                            </div>
                                            <div className="form-group">
                                                <label>Fecha de nacimiento</label>
                                                <div style={{display:'block'}}>
                                                    <DatePicker
                                                        value={this.state.dateOfBirth}
                                                        onChange={this.dateOfBirthChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Género</label>
                                                <select value={this.state.gender} onChange={this.genderChange}>
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="M">Masculino</option>
                                                    <option value="F">Femenino</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Calle</label>
                                                <input value={this.state.street} onChange={this.streetChange} type="text" className="form-control" autoComplete="off" placeholder="Calle" />
                                            </div>
                                            <div className="form-group">
                                                <label>No. Interior</label>
                                                <input value={this.state.interiorNumber} onChange={this.interiorNumberChange} type="text" className="form-control" autoComplete="off" placeholder="No. Interior" />
                                            </div>
                                            <div className="form-group">
                                                <label>No. Exterior</label>
                                                <input value={this.state.exteriorNumber} onChange={this.exteriorNumberChange} type="text" className="form-control" autoComplete="off" placeholder="No. Exterior" />
                                            </div>
                                            <div className="form-group">
                                                <label>Colonia</label>
                                                <input value={this.state.settlement} onChange={this.settlementChange} type="text" className="form-control" autoComplete="off" placeholder="Colonia" />
                                            </div>
                                            <div className="form-group">
                                                <label>Municipio</label>
                                                <input value={this.state.municipality} onChange={this.municipalityChange} type="text" className="form-control" autoComplete="off" placeholder="Municipio" />
                                            </div>
                                            <div className="form-group">
                                                <label>Código Postal</label>
                                                <input value={this.state.postalCode} onChange={this.postalCodeChange} type="text" className="form-control" autoComplete="off" placeholder="Código Postal" />
                                            </div>
                                            <div className="form-group">
                                                <label>Imagen</label>
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
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
                                                <label>Placas</label>
                                                <input value={this.state.vehiclePlates} onChange={this.vehiclePlatesChange} type="text" className="form-control" autoComplete="off" placeholder="Placas del vehículo" />
                                            </div>
                                            <div className="form-group">
                                                <label>Modelo</label>
                                                <input value={this.state.vehicleModel} onChange={this.vehicleModelChange} type="text" className="form-control" autoComplete="off" placeholder="Modelo del vehículo" />
                                            </div>
                                            <div className="form-group">
                                                <label>Color</label>
                                                <input value={this.state.vehicleColor} onChange={this.vehicleColorChange} type="text" className="form-control" autoComplete="off" placeholder="Modelo del vehículo" />
                                            </div>
                                            <div className="form-group">
                                                <label>Propietario del vehículo</label>
                                                <input value={this.state.vehicleOwner} onChange={this.vehicleOwnerChange} type="text" className="form-control" autoComplete="off" placeholder="Modelo del vehículo" />
                                            </div>

                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Crear Usuario</button>
                                            <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardTemplate >
        )
    }
}


function mapStateToProps({ auth }) {
    return {
        token: auth && auth.token,

    }
}
export default connect(mapStateToProps)(AddDriver)
