import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'
import ZoneMap from './ZoneMap'

// API
import { getZone } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { PlusCircle } from 'react-feather';
import moment from 'moment'


class Zones extends Component {

    state = {
        zone: '',
        location: '',
        points: [],
        isMapShown: false,
        isRouteShown: false,
        loading: true
    }

    componentDidMount() {
        document.title = "Detalles de la Zona de Operación"
        const { token } = this.props
        let { zoneId } = this.props.match.params
        getZone({ zoneId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        loading: false,
                        zone: res.payload,
                        isMapShown: true,
                        isRouteShown: true,
                        points: res.payload.zonePoints,
                        location: { lat: res.payload.zonePoints[0].lat, lng: res.payload.zonePoints[0].lng }
                    })
                    console.log(this.state)
                }
            })
    }





    render() {
        const { zone, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Zonas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{zone.id}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-4 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Detalles de la Zona de Operación</h6>

                                    <div className="table-responsive">
                                        <table className="table table-hover" id="zoneTable">

                                            <thead>
                                                <tr>
                                                    <th>Campo</th>
                                                    <th>Valor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Nombre de la Zona</td>
                                                    <td>{zone.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>País</td>
                                                    <td>{zone.country}</td>
                                                </tr>
                                                <tr>
                                                    <td>Estado</td>
                                                    <td>{zone.state}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ciudad</td>
                                                    <td>{'city' in zone && zone.city != null ? zone.city : '-'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fecha de creación</td>
                                                    <td>{zone.createdAt}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-xs-12 col-sm-12 grin-margin ">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Ruta del Viaje</h6>
                                    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}  >
                                        <ZoneMap
                                            isMapShown={this.state.isMapShown}
                                            isRouteShown={this.state.isRouteShown}
                                            location={this.state.location}
                                            points={this.state.points}
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
export default connect(mapStateToProps)(Zones)
