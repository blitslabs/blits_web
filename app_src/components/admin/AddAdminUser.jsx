import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'
import Dropzone from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import DropZone from './DropZone'
import { toast } from 'react-toastify'


// API
import { createAdminUser } from '../../utils/api'

class AddAdminUser extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        rpassword: '',
        phone: '',
        pictureData: '',

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

        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Crear Administrador"
        this.setState({ loading: false })
    }

    nameChange = (e) => this.setState({ name: e.target.value })
    emailChange = (e) => this.setState({ email: e.target.value })
    passwordChange = (e) => this.setState({ password: e.target.value })
    rpasswordChange = (e) => this.setState({ rpassword: e.target.value })
    phoneChange = (e) => this.setState({ phone: e.target.value })
    serviceVehicleIdChange = (e) => this.setState({ serviceVehicleId: e.target.value })
    pictureDataChange = (data) => this.setState({ pictureData: data })

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


    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { token } = this.props
        const {
            name, email, password, rpassword, phone, pictureData,
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

        if (!name) {
            toast.error('Ingresa un nombre válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverMsg: 'Ingresa un nombre válido', serverStatus: 'ERROR' })
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

        createAdminUser({
            name, email, phone, password, rpassword, pictureData, token,
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
        })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        rpassword: '',
                        phone: '',
                        pictureData: '',

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
                        serverMsg: 'Administrador creado correctamente',
                        serverStatus: 'OK'
                    })
                    toast.success('Administrador creado correctamente', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });

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
                            <li className="breadcrumb-item"><Link to={`/admin/drivers`}>Administradores</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Crear</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Crear Administrador</h6>
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
                                                <label>Imagen</label>
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>

                                            <div className="form-group">
                                                <label>Permisos</label>
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
                                                            Conductores
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
                                                        <input onChange={this.ridesChange} type="checkbox" checked={this.state.rides == 1 ? true : false} className="form-check-input" />
                                                            Viajes
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.vehiclesChange} type="checkbox" checked={this.state.vehicles == 1 ? true : false} className="form-check-input" />
                                                            Vehículos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.vehicleMappingChange} type="checkbox" checked={this.state.vehicleMapping == 1 ? true : false} className="form-check-input" />
                                                            Mapeo de vehículos
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.zonesChange} type="checkbox" checked={this.state.zones == 1 ? true : false} className="form-check-input" />
                                                            Zonas
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.farePlansChange} type="checkbox" checked={this.state.farePlans == 1 ? true : false} className="form-check-input" />
                                                            Planes de tarifas
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
                                                        <input onChange={this.reviewsChange} type="checkbox" checked={this.state.reviews == 1 ? true : false} className="form-check-input" />
                                                            Reseñas
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
                                                            Wallets
											            <i className="input-frame"></i>
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input onChange={this.pushNotificationsChange} type="checkbox" checked={this.state.pushNotifications == 1 ? true : false} className="form-check-input" />
                                                            Wallets
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
                                                        <input onChange={this.lostItemsChange} type="checkbox" checked={this.state.lostItems == 1 ? true : false} className="form-check-input" />
                                                            Objetos olvidados
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
export default connect(mapStateToProps)(AddAdminUser)
