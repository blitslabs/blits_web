import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import RideMap from './RideMap'
import { toast } from 'react-toastify'

// API
import { getLostItemDetails, updateLostItem, getRideDetails, getMapRoute } from '../../utils/api'
import { averageGeolocation } from '../../utils/helpers'
import moment from 'moment';

class LostItemDetails extends Component {

    state = {
        lostItem: '',
        lostItemStatus: '',
        ride: '',
        isMapShown: false,
        isRouteShown: false,
        location: '',
        points: [],
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Detalles del Objeto Perdido"
        const { token } = this.props
        let { lostItemId } = this.props.match.params

        getLostItemDetails({ lostItemId, token })
            .then(data => data.json())
            .then((res1) => {
                if (res1.status === 'OK') {
                    const lostItem = res1.payload
                    getRideDetails({ rideId: lostItem.rideId, token })
                        .then(data => data.json())
                        .then((res) => {
                            if (res.status === 'OK') {
                                console.log(res.payload)
                                const ride = res.payload
                                const { startLat, startLng, endLat, endLng } = res.payload
                                let location = averageGeolocation([{ latitude: startLat, longitude: startLng }, { latitude: endLat, longitude: endLng }])
                                location = { lat: location.latitude, lng: location.longitude }
                                getMapRoute({
                                    fromLocation: { lat: startLat, lng: startLng },
                                    toLocation: { lat: endLat, lng: endLng }
                                })
                                    .then(data => data.json())
                                    .then((jsonobject) => {
                                        console.log(jsonobject)
                                        let points = []
                                        jsonobject.routes[0].geometry.coordinates.map((point) => {
                                            points.push({ lat: point[1], lng: point[0] })
                                        })
                                        console.log(points)
                                        this.setState({ lostItem, lostItemStatus: lostItem.status, points, loading: false, ride, location, isMapShown: true, isRouteShown: true })
                                    })

                            }
                        })
                }
            })
    }

    handleLostITemStatusChange = (e) => this.setState({ lostItemStatus: e.target.value })

    handleSubmitBtn = (e) => {
        const { token } = this.props
        const { lostItem, lostItemStatus } = this.state

        updateLostItem({
            lostItemId: lostItem.id,
            fieldToChange: 'status',
            newValue: lostItemStatus,
            token,
        })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    toast.success(res.payload, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ lostItem: res.payload, serverStatus: 'OK', serverMsg: res.message })
                }
            })
    }

    render() {
        const { lostItem, ride, loading, points, location, isMapShown, isRouteShown, serverMsg, serverStatus } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/lostItems`}>Objetos Perdidos</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{lostItem.id}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Detalles del Viaje</h6>
                                        {
                                            serverMsg
                                            &&
                                            <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                {serverMsg}
                                            </div>
                                        }
                                        <div className="table-responsive">
                                            <table className="table table-hover" >
                                                <thead>
                                                    <tr>
                                                        <th>Varlor</th>
                                                        <th>Campo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>ID</td>
                                                        <td>{ride.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nombre</td>
                                                        <td>{ride.user.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Conductor</td>
                                                        <td>{ride.driver.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hora de Inicio</td>
                                                        <td>{moment(ride.startTimestamp).format('DD/MM/YY HH:mm')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hora de Finalización</td>
                                                        <td>{moment(ride.startTimestamp).format('DD/MM/YY HH:mm')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dirección de Inicio</td>
                                                        <td>{ride.startAddress}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dirección de Finalización</td>
                                                        <td>{ride.endAddress}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Distancia Total</td>
                                                        <td>{ride.totalDistance} Km</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Estado del Viaje</td>
                                                        <td>{ride.status}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Objeto Perdido</td>
                                                        <td>{lostItem.itemDescription}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Estado del Objeto Perdido</td>
                                                        <td>
                                                            <select onChange={this.handleLostITemStatusChange} value={this.state.lostItemStatus} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                                <option value="" >Seleccionar opción</option>
                                                                <option value="PENDING" >Pendiente</option>
                                                                <option value="COMPLETED" >Resuelto</option>
                                                            </select>
                                                            <button style={{ marginTop: '10px' }} onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar</button>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 col-sm-12 grin-margin ">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Ruta del Viaje</h6>
                                    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}  >
                                        <RideMap
                                            isMapShown={isMapShown}
                                            isRouteShown={isRouteShown}
                                            location={location}
                                            points={points}
                                        />
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
export default connect(mapStateToProps)(LostItemDetails)
