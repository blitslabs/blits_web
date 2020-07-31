import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'
import GlobalMap from './GlobalMap'

// API
import { getGlobalMapData } from '../../utils/api'
import { averageGeolocation } from '../../utils/helpers'
import moment from 'moment';



class LiveLocations extends Component {

    state = {
        users: '',
        drivers: '',
        activeRides: '',
        completedRides: '',
        isMapShown: false,
        mapOptions: 'ALL',
        loading: true,
        showInfoWindow: false,
        activeMarker: '',
        timeoutId: ''
    }

    componentDidMount() {
        document.title = "Vista Global"
        this._mounted = true
        this.timeoutId = this.pollMapData()
    }

    componentWillUnmount() {
        this._mounted = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
        }
    }

    pollMapData = () => {
        const { token } = this.props

        if (this._mounted) {
            getGlobalMapData({ token })
                .then(data => data.json())
                .then((res) => {
                    console.log(res)
                    if (res.status === 'OK') {
                        this.setState({
                            users: res.payload.users,
                            drivers: res.payload.drivers,
                            activeRides: res.payload.activeRides,
                            completedRides: res.payload.completedRides,
                            isMapShown: true,
                            loading: false
                        })
                        console.log(this.state)
                    }
                })
            setTimeout(this.pollMapData, 5000)
        }
    }

    onMapClicked = (e) => {
        console.log(e)
        this.setState({
            showInfoWindow: false,
            activeMarker: null
        })
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props)
        this.setState({
            activeMarker: marker,
            showInfoWindow: true,
            infoWindowData: props.data,
            markerType: props.markerType
        })
    }

    handleMapOptionsChange = (e) => {
        this.setState({ mapOptions: e.target.value })
        console.log(this.state)
    }

    render() {
        const { loading, isMapShown, users, drivers, activeRides, completedRides } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Vista</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Global</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Vista Global</h6>
                                        <div style={{ marginBottom: '10px' }} value={this.state.mapOptions} onChange={this.handleMapOptionsChange}>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input value="ALL" type="radio" defaultChecked name="options" className="form-check-input" />
                                                        Todos
											<i className="input-frame"></i></label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input value="USERS" type="radio" name="options" className="form-check-input" />
                                                        Usuarios
											<i className="input-frame"></i></label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input value="DRIVERS" type="radio" name="options" className="form-check-input" />
                                                        Conductores
											<i className="input-frame"></i></label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input value="ACTIVE_RIDES" type="radio" name="options" className="form-check-input" />
                                                        Viajes Activos
											<i className="input-frame"></i></label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input value="COMPLETED_RIDES" type="radio" name="options" className="form-check-input" />
                                                        Viajes Completados
											<i className="input-frame"></i></label>
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', height: '100%', minHeight: '80vh' }}  >
                                            <GlobalMap
                                                isMapShown={isMapShown}
                                                users={users}
                                                drivers={drivers}
                                                activeRides={activeRides}
                                                completedRides={completedRides}
                                                mapOptions={this.state.mapOptions}
                                                onMapClicked={this.onMapClicked}
                                                onMarkerClick={this.onMarkerClick}
                                                activeMarker={this.state.activeMarker}
                                                showInfoWindow={this.state.showInfoWindow}
                                                infoWindowData={this.state.infoWindowData}
                                                markerType={this.state.markerType}
                                            />

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
export default connect(mapStateToProps)(LiveLocations)
