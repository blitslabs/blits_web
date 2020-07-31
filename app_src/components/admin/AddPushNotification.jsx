import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import DateTimePicker from 'react-datetime-picker'
import { toast } from 'react-toastify'

// API
import { createPushNotification, getZones } from '../../utils/api'

class AddPushNotification extends Component {

    state = {
        title: '',
        message: '',
        notificationType: '',
        targetUser: '',
        url: '',
        zoneId: '',
        pictureData: '',
        expDate: '',
        zones: '',
        serverMsg: '',
        serverStatus: '',
        loading: false
    }

    componentDidMount() {
        const { token } = this.props
        document.title = "Crear Notificación Push"
        getZones({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ zones: res.payload, loading: false })
                }
            })
    }


    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { title, message, notificationType, targetUser, url, zoneId, pictureData, expDate } = this.state
        const { token } = this.props

        if (!title || !message || !notificationType || !targetUser) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        createPushNotification({ title, message, notificationType, targetUser, url, zoneId, pictureData, expDate, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        title: '',
                        message: '',
                        notificationType: '',
                        targetUser: '',
                        url: '',
                        zoneId: '',
                        pictureData: '',
                        expDate: '',
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

    notificationTypeChange = (e) => this.setState({ notificationType: e.target.value })
    targetUserChange = (e) => this.setState({ targetUser: e.target.value })
    titleChange = (e) => this.setState({ title: e.target.value })
    messageChange = (e) => this.setState({ message: e.target.value })
    urlChange = (e) => this.setState({ url: e.target.value })
    zoneIdChange = (e) => this.setState({ zoneId: e.target.value })
    expDateChange = (date) => this.setState({ expDate: date })
    pictureDataChange = (data) => this.setState({ pictureData: data })

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
                            <li className="breadcrumb-item"><a href="#">Notificaciones</a></li>
                            <li className="breadcrumb-item " aria-current="page">Enviar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Enviar Notificación Push</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Tipo</label>
                                                <select value={this.state.notificationType} onChange={this.notificationTypeChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar un tipo de notificación</option>
                                                    <option value="GENERAL" >General</option>
                                                    <option value="LOCATION" >Por Zona</option>
                                                </select>
                                            </div>
                                            {
                                                this.state.notificationType === 'LOCATION' &&
                                                <div className="form-group">
                                                    <label>Zona</label>
                                                    <select value={this.state.zoneId} onChange={this.zoneIdChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                        <option value="" >Seleccionar una zona</option>
                                                        {
                                                            this.state.zones && this.state.zones.length > 0
                                                                ?
                                                                this.state.zones.map((z, i) => (
                                                                    <option key={i} value={z.id}>{z.name}</option>
                                                                ))
                                                                : null
                                                        }
                                                    </select>
                                                </div>
                                            }                                            
                                            <div className="form-group">
                                                <label>Usuario Objetivo</label>
                                                <select value={this.targetUser} onChange={this.targetUserChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar un usuario objetivo</option>
                                                    <option value="USER" >Usuario</option>
                                                    <option value="DRIVER" >Conductor</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Título</label>
                                                <input value={this.state.title} onChange={this.titleChange} type="test" className="form-control" autoComplete="off" placeholder="Título de la notificación" />
                                            </div>
                                            <div className="form-group">
                                                <label>Mensaje</label>
                                                <input value={this.state.message} onChange={this.messageChange} type="text" className="form-control" autoComplete="off" placeholder="Mensaje de la notificación" />
                                            </div>
                                            <div className="form-group">
                                                <label>URL (Opcional)</label>
                                                <input value={this.state.url} onChange={this.urlChange} type="text" className="form-control" autoComplete="off" placeholder="URL" />
                                            </div>
                                            <div className="form-group">
                                                <label>Fecha de Expiración (Opcional)</label>
                                                <div style={{ display: 'block' }}>
                                                    <DateTimePicker
                                                        onChange={this.expDateChange}
                                                        value={this.state.expDate}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Imagen (Opcional)</label>
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>
                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Enviar Notificación</button>
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
export default connect(mapStateToProps)(AddPushNotification)
