import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { getUserDetails, updateUserDetails, changeUserPassword, getAdminUser, updateAdminUserPermissions, } from '../../utils/api'

class EditAdminUser extends Component {

    state = {
        userId: '',
        name: '',
        email: '',
        phone: '',
        pictureData: '',
        pictureId: '',
        serverMsg: '',
        serverStatus: '',
        password: '',
        rpassword: '',
        serverMsg2: '',
        serverStatus2: '',
        // permissions
        dashboard: 0,
        globalMap: 0,
        users: 0,
        drivers: 0,
        admins: 0,
        documents: 0,
        rides: 0,
        vehicles: 0,
        vehicleMapping: 0,
        zones: 0,
        farePlans: 0,
        wallets: 0,
        finances: 0,
        paymentHistory: 0,
        bankAccounts: 0,
        reviews: 0,
        promoCodes: 0,
        referrals: 0,
        pushNotifications: 0,
        support: 0,
        lostItems: 0,
        businessSettings: 0,
        paymentSettings: 0,
        serverMsg3: '',
        serverStatus3: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Usuario"
        const { token } = this.props
        const { userId } = this.props.match.params

        getUserDetails({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        userId,
                        name: res.payload.name,
                        email: res.payload.email,
                        phone: res.payload.phone,
                        pictureId: res.payload.pictureId,
                        loading: false
                    })
                }
            })

        getAdminUser({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        dashboard: res.payload.dashboard,
                        globalMap: res.payload.globalMap,
                        users: res.payload.users,
                        drivers: res.payload.drivers,
                        admins: res.payload.admins,
                        documents: res.payload.documents,
                        rides: res.payload.rides,
                        vehicles: res.payload.vehicles,
                        vehicleMapping: res.payload.vehicleMapping,
                        zones: res.payload.zones,
                        farePlans: res.payload.farePlans,
                        wallets: res.payload.wallets,
                        finances: res.payload.finances,
                        paymentHistory: res.payload.paymentHistory,
                        bankAccounts: res.payload.bankAccounts,
                        reviews: res.payload.reviews,
                        promoCodes: res.payload.promoCodes,
                        referrals: res.payload.referrals,
                        pushNotifications: res.payload.pushNotifications,
                        support: res.payload.support,
                        lostItems: res.payload.lostItems,
                        businessSettings: res.payload.businessSettings,
                        paymentSettings: res.payload.paymentSettings,
                    })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { userId, name, email, phone, pictureData } = this.state
        const { token } = this.props

        if (!name || !email || !phone) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateUserDetails({ userId, name, email, phone, pictureData, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        name: '',
                        email: '',
                        phone: '',
                        pictureData: '',
                        serverMsg: res.message,
                        serverStatus: 'OK',
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

    handleUpdatePermissionsBtn = (e) => {
        e.preventDefault()

        const {
            userId,
            dashboard,
            globalMap,
            users,
            drivers,
            admins,
            documents,
            rides,
            vehicles,
            vehicleMapping,
            zones,
            farePlans,
            wallets,
            finances,
            paymentHistory,
            bankAccounts,
            reviews,
            promoCodes,
            referrals,
            pushNotifications,
            support,
            lostItems,
            businessSettings,
            paymentSettings,
        } = this.state

        const { token } = this.props

        updateAdminUserPermissions({
            dashboard,
            globalMap,
            users,
            drivers,
            admins,
            documents,
            rides,
            vehicles,
            vehicleMapping,
            zones,
            farePlans,
            wallets,
            finances,
            paymentHistory,
            bankAccounts,
            reviews,
            promoCodes,
            referrals,
            pushNotifications,
            support,
            lostItems,
            businessSettings,
            paymentSettings,
            userId,
            token
        })
            .then((data) => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        serverMsg3: 'Permisos actualizados correctamente',
                        serverStatus3: 'OK'
                    })
                    toast.success('Permisos actualizados correctamente', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                } else {
                    this.setState({ serverMsg3: res.message, serverStatus3: 'ERROR' })
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({ serverMsg3: 'Ocurrió un error al intentar realizar la acción', serverStatus3: 'ERROR' })
                toast.error('Ocurrió un error al intentar realizar la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
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

    passwordChange = (e) => this.setState({ password: e.target.value })
    rpasswordChange = (e) => this.setState({ rpassword: e.target.value })

    // permissions
    dashboardChange = (e) => this.setState({ dashboard: e.target.checked ? 1 : 0 })
    globalMapChange = (e) => this.setState({ globalMap: e.target.checked ? 1 : 0 })
    usersChange = (e) => this.setState({ users: e.target.checked ? 1 : 0 })
    driversChange = (e) => this.setState({ drivers: e.target.checked ? 1 : 0 })
    adminsChange = (e) => this.setState({ admins: e.target.checked ? 1 : 0 })
    documentsChange = (e) => this.setState({ documents: e.target.checked ? 1 : 0 })
    ridesChange = (e) => this.setState({ rides: e.target.checked ? 1 : 0 })
    vehiclesChange = (e) => this.setState({ vehicles: e.target.checked ? 1 : 0 })
    vehicleMappingChange = (e) => this.setState({ vehicleMapping: e.target.checked ? 1 : 0 })
    zonesChange = (e) => this.setState({ zones: e.target.checked ? 1 : 0 })
    farePlansChange = (e) => this.setState({ farePlans: e.target.checked ? 1 : 0 })
    walletsChange = (e) => this.setState({ wallets: e.target.checked ? 1 : 0 })
    financesChange = (e) => this.setState({ finances: e.target.checked ? 1 : 0 })
    paymentHistoryChange = (e) => this.setState({ paymentHistory: e.target.checked ? 1 : 0 })
    bankAccountsChange = (e) => this.setState({ bankAccounts: e.target.checked ? 1 : 0 })
    reviewsChange = (e) => this.setState({ reviews: e.target.checked ? 1 : 0 })
    promoCodesChange = (e) => this.setState({ promoCodes: e.target.checked ? 1 : 0 })
    referralsChange = (e) => this.setState({ referrals: e.target.checked ? 1 : 0 })
    pushNotificationsChange = (e) => this.setState({ pushNotifications: e.target.checked ? 1 : 0 })
    supportChange = (e) => this.setState({ support: e.target.checked ? 1 : 0 })
    lostItemsChange = (e) => this.setState({ lostItems: e.target.checked ? 1 : 0 })
    businessSettingsChange = (e) => this.setState({ businessSettings: e.target.checked ? 1 : 0 })
    paymentSettingsChange = (e) => this.setState({ paymentSettings: e.target.checked ? 1 : 0 })

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    render() {
        const { serverMsg, serverStatus, serverMsg2, serverStatus2, serverMsg3, serverStatus3, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/adminusers`}>Administradores</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Editar Usuario</h6>
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
                                                <label>Imagen</label>
                                                <img style={{ height: '100px', display: 'block', marginBottom: '10px' }} src={`${process.env.API_HOST}/picture/${this.state.pictureId}`} />
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>


                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Usuario</button>
                                            <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 col-sm-12 grin-margin ">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Permisos Administrador</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg3
                                                &&
                                                <div className={serverStatus3 === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg3}
                                                </div>
                                            }

                                            <div className="form-group">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.dashboardChange} type="checkbox" checked={this.state.dashboard == 1 ? true : false} className="form-check-input" />
                                                            Dashboard
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.globalMapChange} type="checkbox" checked={this.state.globalMap == 1 ? true : false} className="form-check-input" />
                                                            Global Map
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.usersChange} type="checkbox" checked={this.state.users == 1 ? true : false} className="form-check-input" />
                                                            Usuarios
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.driversChange} type="checkbox" checked={this.state.drivers == 1 ? true : false} className="form-check-input" />
                                                            Proyectos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.adminsChange} type="checkbox" checked={this.state.admins == 1 ? true : false} className="form-check-input" />
                                                            Administradores
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.documentsChange} type="checkbox" checked={this.state.documents == 1 ? true : false} className="form-check-input" />
                                                            Documentos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>                                               

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.walletsChange} type="checkbox" checked={this.state.wallets == 1 ? true : false} className="form-check-input" />
                                                            Wallets
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.financesChange} type="checkbox" checked={this.state.finances == 1 ? true : false} className="form-check-input" />
                                                            Finanzas
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.paymentHistoryChange} type="checkbox" checked={this.state.paymentHistory == 1 ? true : false} className="form-check-input" />
                                                            Historial de pagos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.bankAccountsChange} type="checkbox" checked={this.state.bankAccounts == 1 ? true : false} className="form-check-input" />
                                                            Liquidación de pagos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>                                                

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.promoCodesChange} type="checkbox" checked={this.state.promoCodes == 1 ? true : false} className="form-check-input" />
                                                            Códigos promocionales
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.referralsChange} type="checkbox" checked={this.state.referrals == 1 ? true : false} className="form-check-input" />
                                                            Referidos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.pushNotificationsChange} type="checkbox" checked={this.state.pushNotifications == 1 ? true : false} className="form-check-input" />
                                                            Notificaciones Push
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.supportChange} type="checkbox" checked={this.state.support == 1 ? true : false} className="form-check-input" />
                                                            Soporte
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>                                                

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.businessSettingsChange} type="checkbox" checked={this.state.businessSettings == 1 ? true : false} className="form-check-input" />
                                                            Configuración de negocio
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.paymentSettingsChange} type="checkbox" checked={this.state.paymentSettings == 1 ? true : false} className="form-check-input" />
                                                            Configuración de pagos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>


                                            </div>


                                            <button onClick={this.handleUpdatePermissionsBtn} className="btn btn-primary mr-2">Actualizar Permisos</button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
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
export default connect(mapStateToProps)(EditAdminUser)
