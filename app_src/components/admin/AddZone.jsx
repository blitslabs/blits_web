import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import AddZoneMap from './AddZoneMap'
import { toast } from 'react-toastify'

// API
import { createZone } from '../../utils/api'
import csc from 'country-state-city'


// Libraries
import moment from 'moment';

class AddZone extends Component {

    state = {
        isMapShown: false,
        isRouteShown: false,
        points: [],
        countries: '',
        states: '',
        cities: '',
        name: '',
        selectedCountry: '',
        selectedState: '',
        selectedCity: '',
        selectedCurrency: 'MXN',
        selectedStatus: 'ACTIVE',
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Crear Zona"
        const { token } = this.props

        const countries = csc.getAllCountries()
        
        this.setState({ isMapShown: true, isRouteShown: true, loading: false, countries  })
    }

    handleAddPoint = (mapProps, map, event) => {
        const { points } = this.state
        const location = { lat: event.latLng.lat(), lng: event.latLng.lng() }
        this.setState({ points: [...points, location] })
        console.log(this.state.points)
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleCountryChange = (e) => {
        const countryId = e.target.value
        const states = csc.getStatesOfCountry(countryId)
        this.setState({ selectedCountry: countryId, states })
    }

    handleStateChange = (e) => {
        const stateId = e.target.value
        const cities = csc.getCitiesOfState(stateId)
        console.log(cities)
        this.setState({ selectedState: stateId, cities })
    }

    handleCityChange = (e) => {
        const cityId = e.target.value
        this.setState({ selectedCity: cityId })
    }

    handleCurrencyChange = (e) => {
        this.setState({ selectedCurrency: e.target.value })
    }

    handleStatusChange = (e) => {
        this.setState({ selectedStatus: e.target.value })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { name, selectedCountry, selectedState, selectedCity, selectedCurrency, selectedStatus, points } = this.state
        const { token } = this.props        

        if(!name) {
            toast.error('Ingresa un nombre para la zona de operación', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Ingresa un nombre para la zona de operación', serverStatus: 'ERROR'})
            return
        }

        if(!selectedCountry) {
            toast.error('Ingresa un país para la zona de operación', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Ingresa un país para la zona de operación', serverStatus: 'ERROR'})
            return
        }

        if(!selectedState) {
            toast.error('Ingresa un estado para la zona de operación', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Ingresa un estado para la zona de operación', serverStatus: 'ERROR'})
            return
        }

        if(!selectedCurrency) {
            toast.error('Ingresa una divisa para la zona de operación', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Ingresa una divisa para la zona de operación', serverStatus: 'ERROR'})
            return
        }

        if(!selectedStatus) {
            toast.error('Ingresa status para la zona de operación', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Ingresa status para la zona de operación', serverStatus: 'ERROR'})
            return
        }

        if(!points || points.length < 1) {
            toast.error('Selecciona una zona de operación en el mapa', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Selecciona una zona de operación en el mapa', serverStatus: 'ERROR'})
            return
        }      

        const country = (csc.getCountryById(selectedCountry)).name
        const state = (csc.getStateById(selectedState)).name
        const city = (csc.getCityById(selectedCity)).name

        createZone({
            name,
            country,
            state,
            city,
            currency: selectedCurrency,
            status: selectedStatus,
            zonePoints: points,
            token
        })
            .then(data => data.json())
            .then((res) => {
                if (res.status == 'OK') {
                    console.log(res.payload)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        name: '',
                        selectedCountry: '',
                        selectedState: '',
                        selectedCity: '',
                        selectedStatus: '',
                        points: '',
                        serverMsg: res.message,
                        serverStatus: 'OK'
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

    handleGoBack = (e) => {
        e.preventDefault()
        this.props.history.goBack()
    }

    render() {
        const { selectedCountry, selectedState, selectedCity, countries, states, cities, serverMsg, serverStatus, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/zones`}>Zonas</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Agregar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-4 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Detalles del Viaje</h6>
                                        <div className="table-responsive">
                                            <form className="forms-sample">
                                                {
                                                    serverMsg
                                                    &&
                                                    <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                        {serverMsg}
                                                    </div>
                                                }
                                                <div className="form-group">
                                                    <label >Nombre de la Zona</label>
                                                    <input value={this.state.name} onChange={this.handleNameChange} type="text" className="form-control" autoComplete="off" placeholder="Nombre de la Zona" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">País</label>
                                                    <select value={selectedCountry} onChange={this.handleCountryChange} placeholder="Seleccionar País" className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                        <option value="">Seleccionar País</option>
                                                        {
                                                            countries &&
                                                            countries.map((country, i) => (
                                                                <option key={i} value={country.id}>{country.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Estado</label>
                                                    <select value={selectedState} onChange={this.handleStateChange} placeholder="Seleccionar Estado" className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                        <option value="">Seleccionar Estado</option>
                                                        {
                                                            states &&
                                                            states.map((s, i) => (
                                                                <option key={i} value={s.id}>{s.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Ciudad</label>
                                                    <select value={selectedCity} onChange={this.handleCityChange} placeholder="Seleccionar Ciudad" className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                        <option value="">Seleccionar Ciudad</option>
                                                        {
                                                            cities &&
                                                            cities.map((c, i) => (
                                                                <option key={i} value={c.id}>{c.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Divisa</label>
                                                    <select value={this.state.selectedCurrency} onChange={this.handleCurrencyChange} placeholder="Seleccionar Divisa" className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                        <option value="MXN" >Pesos Mexicanos (MXN)</option>
                                                        <option value="USD" >Dólares Americanos (USD)</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Status</label>
                                                    <select value={this.state.selectedStatus} onChange={this.handleStatusChange} placeholder="Seleccionar Status" className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                        <option value="ACTIVE" >Active</option>
                                                        <option value="INACTIVE" >Inactive</option>
                                                        <option value="BANNED" >Banned</option>
                                                    </select>
                                                </div>

                                                <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Crear Zona</button>
                                                <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                            </form>
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
                                        <AddZoneMap
                                            isMapShown={this.state.isMapShown}
                                            isRouteShown={this.state.isRouteShown}
                                            points={this.state.points}
                                            handleAddPoint={this.handleAddPoint}
                                            handleCoordinateChange={this.handleCoordinateChange}
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
export default connect(mapStateToProps)(AddZone)
