import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getRideDetails, updateRideDetails } from '../../utils/api'

// Libraries
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


class EditScheduledRide extends Component {

    state = {
        ride: '',
        scheduledTime: new Date(),
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Viaje Programado"
        const { token } = this.props
        let { rideId } = this.props.match.params

        getRideDetails({ rideId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, ride: res.payload })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        
        const { ride, scheduledTime } = this.state
        const { token } = this.props

        if (!ride || !scheduledTime) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateRideDetails({ rideId: ride.id, fieldToChange: 'scheduledTime', newValue: scheduledTime, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res.status)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        ride: res.payload,
                        scheduledTime: new Date(),
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

    handleScheduledTimeChange = (scheduledTime) => this.setState({ scheduledTime })

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    render() {
        const { serverMsg, serverStatus, loading, ride } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Viajes Programados</a></li>
                            <li className="breadcrumb-item " aria-current="page">Editar</li>
                            <li className="breadcrumb-item active" aria-current="page">{ride.id}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Actualizar Viaje Programado</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label >Hora Programada </label><br/>
                                                <DateTimePicker
                                                    onChange={this.handleScheduledTimeChange}
                                                    value={this.state.scheduledTime}
                                                />
                                            </div>
                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Viaje Programado</button>
                                            <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Detalles del Viaje Programado</h6>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Varlor</th>
                                                        <th>Campo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Distancia Total</td>
                                                        <td>{ride.totalDistance}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hora Programada</td>
                                                        <td>{moment(ride.scheduledTime).format('DD/MM/YY HH:mm')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dirección de Inicio</td>
                                                        <td>{ride.startAddress}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Distancia de Finalización</td>
                                                        <td>{ride.endAddress}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Estado</td>
                                                        <td>{ride.status}</td>
                                                    </tr>
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
export default connect(mapStateToProps)(withRouter(EditScheduledRide))
