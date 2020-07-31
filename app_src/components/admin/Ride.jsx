import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'
import RideMap from './RideMap'

// API
import { getRideDetails, getMapRoute } from '../../utils/api'
import { averageGeolocation } from '../../utils/helpers'
import moment from 'moment';



class Ride extends Component {

    state = {
        ride: '',
        isMapShown: false,
        isRouteShown: false,
        location: '',
        points: [],
        loading: true
    }

    componentDidMount() {
        document.title = "Detalles del Viaje"
        const { token } = this.props
        let { rideId } = this.props.match.params

        getRideDetails({ rideId, token })
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
                            this.setState({ points, loading: false, ride, location, isMapShown: true, isRouteShown: true })
                        })

                }
            })

    }

    render() {
        const { ride, loading, points, location, isMapShown, isRouteShown } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/rides/COMPLETED`}>Viajes</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{ride.id}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-4 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Detalles del Viaje</h6>
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
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-xs-12 col-sm-12 grin-margin ">
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
export default connect(mapStateToProps)(Ride)
