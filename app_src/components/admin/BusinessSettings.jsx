import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { getBusinessSettings, updateBusinessSettings } from '../../utils/api'


class BusinessSettings extends Component {

    state = {
        businessName: '',
        businessLogo: '',
        businessIcon: '',
        businessLogoImageId: '',
        businessIconImageId: '',
        copyrightContent: '',
        playStoreUserApp: '',
        playStoreDriverApp: '',
        appStoreUserApp: '',
        appStoreDriverApp: '',
        distanceUnit: '',
        waitingTimeOut: '',
        providerSearchRadius: '',
        emergencyNumber: '',
        contactNumber: '',
        email: '',
        scheduleTriggerTime: '',
        driverPhoneValidation: '',
        driverEmailValidation: '',
        userPhoneValidation: '',
        userEmailValidation: '',
        rideCancellationTime: '',
        rideCancellationCharges: '',
        allowChat: '',
        socialLoginUser: '',
        socialLoginDriver: '',
        serverMsg: '',
        serverStatus: '',
        loading: true,
    }

    componentDidMount() {
        const { token } = this.props
        document.title = "Configuración de Negocio"

        getBusinessSettings({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK' && 'payload' in res) {
                    const settings = res.payload                    
                    this.setState({
                        loading: false,
                        businessName: settings.businessName,
                        businessLogoImageId: settings.businessLogoImageId,
                        businessIconImageId: settings.businessIconImageId,
                        copyrightContent: settings.copyrightContent,
                        playStoreUserApp: settings.playStoreUserApp,
                        playStoreDriverApp: settings.playStoreDriverApp,
                        appStoreUserApp: settings.appStoreUserApp,
                        appStoreDriverApp: settings.appStoreDriverApp,
                        distanceUnit: settings.distanceUnit,
                        waitingTimeOut: settings.waitingTimeOut,
                        providerSearchRadius: settings.providerSearchRadius,
                        emergencyNumber: settings.emergencyNumber,
                        contactNumber: settings.contactNumber,
                        email: settings.email,
                        scheduleTriggerTime: settings.scheduleTriggerTime,
                        driverPhoneValidation: settings.driverPhoneValidation,
                        driverEmailValidation: settings.driverEmailValidation,
                        userPhoneValidation: settings.userPhoneValidation,
                        userEmailValidation: settings.userEmailValidation,
                        rideCancellationTime: settings.rideCancellationTime,
                        rideCancellationCharges: settings.rideCancellationCharges,
                        allowChat: settings.allowChat,
                        socialLoginUser: settings.socialLoginUser,
                        socialLoginDriver: settings.socialLoginDriver,
                    })
                } else {
                    this.setState({ loading: false })
                }
            })
    }

    handleBusinessNameChange = (e) => this.setState({ businessName: e.target.value })
    handleBusinessLogoChange = (businessLogo) => this.setState({ businessLogo })
    handleBusinessIconChange = (businessIcon) => this.setState({ businessIcon })
    handleCopyrightContentChange = (e) => this.setState({ copyrightContent: e.target.value })
    handlePlaystoreUserChange = (e) => this.setState({ playStoreUserApp: e.target.value })
    handlePlaystoreDriverChange = (e) => this.setState({ playStoreDriverApp: e.target.value })
    handleAppstoreUserChange = (e) => this.setState({ appStoreUserApp: e.target.value })
    handleAppstoreDriverChange = (e) => this.setState({ appStoreDriverApp: e.target.value })
    handleDistanceUnitChange = (e) => this.setState({ distanceUnit: e.target.value })
    handleWaitingTimeOutChange = (e) => this.setState({ waitingTimeOut: e.target.value })
    handleProviderSearchRadiusChange = (e) => this.setState({ providerSearchRadius: e.target.value })
    handleEmergencyNumberChange = (e) => this.setState({ emergencyNumber: e.target.value })
    handleContactNumberChange = (e) => this.setState({ contactNumber: e.target.value })
    handleEmailChange = (e) => this.setState({ email: e.target.value })
    handleScheduleTriggerTime = (e) => this.setState({ scheduleTriggerTime: e.target.value })
    handleDriverPhoneValidation = (e) => this.setState({ driverPhoneValidation: e.target.value })
    handleDriverEmailValidation = (e) => this.setState({ driverEmailValidation: e.target.value })
    handleUserPhoneValidation = (e) => this.setState({ userPhoneValidation: e.target.value })
    handleUserEmailValidation = (e) => this.setState({ userEmailValidation: e.target.value })
    handleRideCancellationTime = (e) => this.setState({ rideCancellationTime: e.target.value })
    handleRideCancellationCharges = (e) => this.setState({ rideCancellationCharges: e.target.value })
    handleAllowChat = (e) => this.setState({ allowChat: e.target.value })
    handleSocialLoginUser = (e) => this.setState({ socialLoginUser: e.target.value })
    handleSocialLoginDriver = (e) => this.setState({ socialLoginDriver: e.target.value })

    handleSubmitBtn = (e) => {
        e.preventDefault()

        const { token } = this.props

        const {
            businessName,
            businessLogo,
            businessIcon,
            copyrightContent,
            playStoreUserApp,
            playStoreDriverApp,
            appStoreUserApp,
            appStoreDriverApp,
            distanceUnit,
            waitingTimeOut,
            providerSearchRadius,
            emergencyNumber,
            contactNumber,
            email,
            scheduleTriggerTime,
            driverPhoneValidation,
            driverEmailValidation,
            userPhoneValidation,
            userEmailValidation,
            rideCancellationTime,
            rideCancellationCharges,
            allowChat,
            socialLoginUser,
            socialLoginDriver,
        } = this.state

        if (!businessName) {
            toast.error('Ingresa un nombre de la empresa válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un nombre de la empresa válido' })
            return
        }

        if (!copyrightContent) {
            toast.error('Ingresa el contenido de derechos de autor', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa el contenido de derechos de autor' })
            return
        }

        if (!playStoreUserApp) {
            toast.error('Ingresa URL de la app de usuarios en Google Play', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa URL de la app de usuarios en Google Play' })
            return
        }

        if (!playStoreDriverApp) {
            toast.error('Ingresa URL de la app de conductores en Google Play', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa URL de la app de conductores en Google Play' })
            return
        }

        if (!appStoreUserApp) {
            toast.error('Ingresa URL de la app de usuarios en App Store', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa URL de la app de usuarios en App Store' })
            return
        }

        if (!appStoreDriverApp) {
            toast.error('Ingresa URL de la app de conductores en App Store', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa URL de la app de conductores en App Store' })
            return
        }

        if (!distanceUnit) {
            toast.error('Selecciona una unidad de distancia', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona una unidad de distancia' })
            return
        }

        if (!waitingTimeOut || isNaN(waitingTimeOut) || waitingTimeOut <= 0) {
            toast.error('Ingresa un tiempo de espera de viajes válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un tiempo de espera de viajes válido' })
            return
        }

        if (!providerSearchRadius || isNaN(providerSearchRadius) || providerSearchRadius <= 0) {
            toast.error('Ingresa un radio de búsqueda de conductores válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un radio de búsqueda de conductores válido' })
            return
        }

        if (!emergencyNumber) {
            toast.error('Ingresa un teléfono de emergencia válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un teléfono de emergencia válido' })
            return
        }

        if (!contactNumber) {
            toast.error('Ingresa un teléfono de contacto válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un teléfono de contacto válido' })
            return
        }

        if (!email) {
            toast.error('Ingresa un email válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un email válido' })
            return
        }

        if (!scheduleTriggerTime || isNaN(scheduleTriggerTime) || scheduleTriggerTime <= 0) {
            toast.error('Ingresa un tiempo de activación de viajes programado válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un tiempo de activación de viajes programado válido' })
            return
        }

        if (!driverPhoneValidation || !(driverPhoneValidation == 'ACTIVE' || driverPhoneValidation == 'INACTIVE')) {
            toast.error('Selecciona el estado de la validación de teléfono de los conductores', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la validación de teléfono de los conductores' })
            return
        }

        if (!driverEmailValidation || !(driverEmailValidation == 'ACTIVE' || driverEmailValidation == 'INACTIVE')) {
            toast.error('Selecciona el estado de la validación de email de los conductores', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la validación de email de los conductores' })
            return
        }

        if (!userPhoneValidation || !(userPhoneValidation == 'ACTIVE' || userPhoneValidation == 'INACTIVE')) {
            toast.error('Selecciona el estado de la validación de teléfono de los usuairos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la validación de teléfono de los usuairos' })
            return
        }

        if (!userEmailValidation || !(userEmailValidation == 'ACTIVE' || userEmailValidation == 'INACTIVE')) {
            toast.error('Selecciona el estado de la validación de teléfono de los usuarios', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la validación de teléfono de los usuarios' })
            return
        }

        if (!rideCancellationTime || isNaN(rideCancellationTime) || rideCancellationTime <= 0) {
            toast.error('Ingresa un tiempo de cancelación de viajes válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un tiempo de cancelación de viajes válido' })
            return
        }

        if (!rideCancellationCharges || isNaN(rideCancellationCharges) || rideCancellationCharges <= 0) {
            toast.error('Ingresa un cargo por cancelación de viajes válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un cargo por cancelación de viajes válido' })
            return
        }

        if (!allowChat || !(allowChat == 'ACTIVE' || allowChat == 'INACTIVE')) {
            toast.error('Selecciona el estado de la funcionalidad de chat', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la funcionalidad de chat' })
            return
        }

        if (!socialLoginUser || !(socialLoginUser == 'ACTIVE' || socialLoginUser == 'INACTIVE')) {
            toast.error('Selecciona el estado de la funcionalidad de inicio de sesión con redes sociales para usuarios', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la funcionalidad de inicio de sesión con redes sociales para usuarios' })
            return
        }

        if (!socialLoginDriver || !(socialLoginDriver == 'ACTIVE' || socialLoginDriver == 'INACTIVE')) {
            toast.error('Selecciona el estado de la funcionalidad de inicio de sesión con redes sociales para conductores', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona el estado de la funcionalidad de inicio de sesión con redes sociales para conductores' })
            return
        }

        updateBusinessSettings({
            businessName,
            businessLogo,
            businessIcon,
            copyrightContent,
            playStoreUserApp,
            playStoreDriverApp,
            appStoreUserApp,
            appStoreDriverApp,
            distanceUnit,
            waitingTimeOut,
            providerSearchRadius,
            emergencyNumber,
            contactNumber,
            email,
            scheduleTriggerTime,
            driverPhoneValidation,
            driverEmailValidation,
            userPhoneValidation,
            userEmailValidation,
            rideCancellationTime,
            rideCancellationCharges,
            allowChat,
            socialLoginUser,
            socialLoginDriver,
            token
        })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    toast.success(res.messsage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        businessName: '',
                        businessLogo: '',
                        businessIcon: '',
                        copyrightContent: '',
                        playStoreUserApp: '',
                        playStoreDriverApp: '',
                        appStoreUserApp: '',
                        appStoreDriverApp: '',
                        distanceUnit: '',
                        waitingTimeOut: '',
                        providerSearchRadius: '',
                        emergencyNumber: '',
                        contactNumber: '',
                        email: '',
                        scheduleTriggerTime: '',
                        driverPhoneValidation: '',
                        driverEmailValidation: '',
                        userPhoneValidation: '',
                        userEmailValidation: '',
                        rideCancellationTime: '',
                        rideCancellationCharges: '',
                        allowChat: '',
                        socialLoginUser: '',
                        socialLoginDriver: '',
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
                this.setState({serverMsg: 'Ocurrió un error al intentar realización la acción', serverStatus: 'ERROR'})
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
                            <li className="breadcrumb-item"><a href="#">Configuración</a></li>
                            <li className="breadcrumb-item " aria-current="page">Negocio</li>

                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Configuración de Negocio</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Nombre de la Empresa</label>
                                                <input onChange={this.handleBusinessNameChange} required="required" value={this.state.businessName} type="text" className="form-control" autoComplete="off" placeholder="Nombre de la empresa" />
                                            </div>
                                            <div className="form-group">
                                                <label>Logo de la Empresa</label>
                                                <img style={{height:'50px', display: 'block'}} src={process.env.API_HOST + '/picture/' + this.state.businessLogoImageId + ''} />
                                                
                                            </div>
                                            <DropZone saveFileData={this.handleBusinessLogoChange} multiple={false} />
                                            <div className="form-group">
                                                <label>Ícono de la Empresa</label>
                                                <img style={{height:'50px', display: 'block'}} src={process.env.API_HOST + '/picture/' + this.state.businessIconImageId + ''} />
                                                
                                            </div>
                                            <DropZone saveFileData={this.handleBusinessIconChange} multiple={false} />
                                            <div className="form-group">
                                                <label>Contenido Derechos de Autor</label>
                                                <input onChange={this.handleCopyrightContentChange} value={this.state.copyrightContent} type="text" className="form-control" autoComplete="off" placeholder="Contenido derechos de autor" />
                                            </div>
                                            <div className="form-group">
                                                <label>Playstore User App (URL)</label>
                                                <input onChange={this.handlePlaystoreUserChange} value={this.state.playStoreUserApp} type="text" className="form-control" autoComplete="off" placeholder="Playstore User App (URL)" />
                                            </div>
                                            <div className="form-group">
                                                <label>Playstore Driver App (URL)</label>
                                                <input onChange={this.handlePlaystoreDriverChange} value={this.state.playStoreDriverApp} type="text" className="form-control" autoComplete="off" placeholder="Playstore Driver App (URL)" />
                                            </div>
                                            <div className="form-group">
                                                <label >Unidad de Distancia</label>
                                                <select value={this.state.distanceUnit} onChange={this.handleDistanceUnitChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar unidad de distancia</option>
                                                    <option value="KM" >Km</option>
                                                    <option value="MILES" >Millas</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tiempo de espera (Minutos)</label>
                                                <input onChange={this.handleWaitingTimeOutChange} value={this.state.waitingTimeOut} type="number" className="form-control" autoComplete="off" placeholder="Tiempo de espera" />
                                            </div>
                                            <div className="form-group">
                                                <label>Radio de Búsqueda de Conductores (Km)</label>
                                                <input onChange={this.handleProviderSearchRadiusChange} value={this.state.providerSearchRadius} type="number" className="form-control" autoComplete="off" placeholder="Radio de búsqueda de conductores" />
                                            </div>

                                            <div className="form-group">
                                                <label>Teléfono de Emergencia</label>
                                                <input onChange={this.handleEmergencyNumberChange} value={this.state.emergencyNumber} type="number" className="form-control" autoComplete="off" placeholder="Teléfono de emergencia" />
                                            </div>
                                            <div className="form-group">
                                                <label>Teléfono de Contacto</label>
                                                <input onChange={this.handleContactNumberChange} value={this.state.contactNumber} type="number" className="form-control" autoComplete="off" placeholder="Teléfono de contacto" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email de Contacto</label>
                                                <input onChange={this.handleEmailChange} value={this.state.email} type="email" className="form-control" autoComplete="off" placeholder="Email de contacto" />
                                            </div>
                                            <div className="form-group">
                                                <label>Tiempo de Activación de Viajes Programados (Minutos)</label>
                                                <input onChange={this.handleScheduleTriggerTime} value={this.state.scheduleTriggerTime} type="number" className="form-control" autoComplete="off" placeholder="Tiempo de activación de viajes programados" />
                                            </div>
                                            <div className="form-group">
                                                <label>Requerir validación de Email a Conductor</label>
                                                <select onChange={this.handleDriverEmailValidation} value={this.state.driverEmailValidation} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Requerir validación de Teléfono a Conductor</label>
                                                <select onChange={this.handleDriverPhoneValidation} value={this.state.driverPhoneValidation} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Requerir validación de Email a Usuario</label>
                                                <select onChange={this.handleUserEmailValidation} value={this.state.userEmailValidation} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Requerir validación de Teléfono a Usuario</label>
                                                <select onChange={this.handleUserPhoneValidation} value={this.state.userPhoneValidation} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Tiempo de Cancelación de Viajes (Minutos)</label>
                                                <input onChange={this.handleRideCancellationTime} value={this.state.rideCancellationTime} type="number" className="form-control" autoComplete="off" placeholder="Timepo de cancelación de viajes" />
                                            </div>
                                            <div className="form-group">
                                                <label>Cargos por cancelación de Viajes ($)</label>
                                                <input onChange={this.handleRideCancellationCharges} value={this.state.rideCancellationCharges} type="number" className="form-control" autoComplete="off" placeholder="Cargos por cancelación de viajes" />
                                            </div>
                                            <div className="form-group">
                                                <label>Habilitar Chat entre Usuario y Conductor</label>
                                                <select onChange={this.handleAllowChat} value={this.state.allowChat} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Habilitar Inicio de Sesión con Redes Sociales (Usuario)</label>
                                                <select onChange={this.handleSocialLoginUser} value={this.state.socialLoginUser} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Habilitar Inicio de Sesión con Redes Sociales (Conductor)</label>
                                                <select onChange={this.handleSocialLoginDriver} value={this.state.socialLoginDriver} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    <option value="ACTIVE" >Activado</option>
                                                    <option value="INACTIVE" >Desactivado</option>
                                                </select>
                                            </div>

                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Configuración</button>
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
export default connect(mapStateToProps)(BusinessSettings)