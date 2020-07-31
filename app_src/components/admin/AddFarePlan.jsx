import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import TimePicker from 'react-time-picker';
import { toast } from 'react-toastify'

// Styles
import '../styles.css'

// API
import { createServiceFarePlan } from '../../utils/api'

class AddFarePlan extends Component {

    state = {
        farePlanName: '',
        startKm: '',
        upToKm: '',
        pricePerKm: '',
        waitingPricePerMinute: '',
        applyPeakFare: 'INACTIVE',
        applyNightFare: 'INACTIVE',
        nightFareStart: '18:00',
        nightFareEnd: '5:00',
        nightFare: '',
        mondayPeakFareStartTime: '',
        mondayPeakFareEndTime: '',
        mondayPeakFare: '',
        tuesdayPeakFareStartTime: '',
        tuesdayPeakFareEndTime: '',
        tuesdayPeakFare: '',
        wednesdayPeakFareStartTime: '',
        wednesdayPeakFareEndTime: '',
        wednesdayPeakFare: '',
        thursdayPeakFareStartTime: '',
        thursdayPeakFareEndTime: '',
        thursdayPeakFare: '',
        fridayPeakFareStartTime: '',
        fridayPeakFareEndTime: '',
        fridayPeakFare: '',
        saturdayPeakFareStartTime: '',
        saturdayPeakFareEndTime: '',
        saturdayPeakFare: '',
        sundayPeakFareStartTime: '',
        sundayPeakFareEndTime: '',
        sundayPeakFare: '',
        serverMsg: '',
        serverStatus: '',
        loading: false
    }

    componentDidMount() {
        document.title = "Añadir Plan Tarifario"
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { token } = this.props
        const {
            farePlanName,
            startKm,
            upToKm,
            pricePerKm,
            waitingPricePerMinute,
            applyPeakFare,
            applyNightFare,
            nightFareStart,
            nightFareEnd,
            nightFare,
            mondayPeakFareStartTime,
            mondayPeakFareEndTime,
            mondayPeakFare,
            tuesdayPeakFareStartTime,
            tuesdayPeakFareEndTime,
            tuesdayPeakFare,
            wednesdayPeakFareStartTime,
            wednesdayPeakFareEndTime,
            wednesdayPeakFare,
            thursdayPeakFareStartTime,
            thursdayPeakFareEndTime,
            thursdayPeakFare,
            fridayPeakFareStartTime,
            fridayPeakFareEndTime,
            fridayPeakFare,
            saturdayPeakFareStartTime,
            saturdayPeakFareEndTime,
            saturdayPeakFare,
            sundayPeakFareStartTime,
            sundayPeakFareEndTime,
            sundayPeakFare,
        } = this.state

        if (!farePlanName) {
            toast.error('Ingresa un nombre para el Plan Tarifario', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un nombre para el Plan Tarifario' })
            return
        }

        if (!startKm || isNaN(startKm)) {
            toast.error('Ingresa el número de Km de inicio del Plan Tarifario', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa el número de Km de inicio del Plan Tarifario' })
            return
        }

        if (!upToKm || isNaN(upToKm)) {
            toast.error('Ingresa el número de Km de finalización del Plan Tarifario', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa el número de Km de finalización del Plan Tarifario' })
            return
        }

        if(startKm > upToKm) {
            toast.error('El Km de inicio debe ser menor al Km de finalización', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({serverStatus: 'ERROR', serverMsg: 'El Km de inicio debe ser menor al Km de finalización'})
            return
        }

        if (!pricePerKm || isNaN(pricePerKm) || pricePerKm < 0) {
            toast.error('Ingresa el precio por Km del Plan Tarifario', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa el precio por Km del Plan Tarifario' })
            return
        }

        if (!waitingPricePerMinute || isNaN(waitingPricePerMinute) || waitingPricePerMinute < 0) {
            toast.error('Ingresa precio por minuto de espera del Plan Tarifario', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa precio por minuto de espera del Plan Tarifario' })
            return
        }

        if (!applyPeakFare || !(applyPeakFare === 'ACTIVE' || applyPeakFare === 'INACTIVE')) {
            toast.error('Selecciona si se aplicará una tarifa distinta en Hora Pico', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona si se aplicará una tarifa distinta en Hora Pico' })
            return
        }

        if (!applyNightFare || !(applyNightFare === 'ACTIVE' || applyNightFare === 'INACTIVE')) {
            toast.error('Selecciona si se aplicará una nocturna', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona si se aplicará una nocturna' })
            return
        }

        if (applyNightFare === 'ACTIVE' && (!nightFareStart || !nightFareEnd)) {
            toast.error('Selecciona una hora de inicio y finalización de la tarifa noctura', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona una hora de inicio y finalización de la tarifa noctura' })
            return
        }

        if (applyNightFare === 'ACTIVE' && (!nightFare || isNaN(nightFare) || nightFare < 0)) {
            toast.error('Ingresa un tarifa noctura válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un tarifa noctura válida' })
            return
        }

        if (mondayPeakFareStartTime || mondayPeakFareEndTime || mondayPeakFare) {
            if (!(mondayPeakFareStartTime && mondayPeakFareEndTime && mondayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del lunes', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del lunes' })
                return
            }
        }

        if (tuesdayPeakFareStartTime || tuesdayPeakFareEndTime || tuesdayPeakFare) {
            if (!(tuesdayPeakFareStartTime && tuesdayPeakFareEndTime && tuesdayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del martes', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del martes' })
                return
            }
        }

        if (wednesdayPeakFareStartTime || wednesdayPeakFareEndTime || wednesdayPeakFare) {
            if (!(wednesdayPeakFareStartTime && wednesdayPeakFareEndTime && wednesdayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del miércoles', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del miércoles' })
                return
            }
        }

        if (thursdayPeakFareStartTime || thursdayPeakFareEndTime || thursdayPeakFare) {
            if (!(thursdayPeakFareStartTime && thursdayPeakFareEndTime && thursdayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del jueves', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del jueves' })
                return
            }
        }

        if (fridayPeakFareStartTime || fridayPeakFareEndTime || fridayPeakFare) {
            if (!(fridayPeakFareStartTime && fridayPeakFareEndTime && fridayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del viernes', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del viernes' })
                return
            }
        }

        if (saturdayPeakFareStartTime || saturdayPeakFareEndTime || saturdayPeakFare) {
            if (!(saturdayPeakFareStartTime && saturdayPeakFareEndTime && saturdayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del sábado', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del sábado' })
                return
            }
        }

        if (sundayPeakFareStartTime || sundayPeakFareEndTime || sundayPeakFare) {
            if (!(sundayPeakFareStartTime && sundayPeakFareEndTime && sundayPeakFare)) {
                toast.error('Ingresa todos los campos requeridos para la tarifa hora pico del domingo', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa todos los campos requeridos para la tarifa hora pico del domingo' })
                return
            }
        }        

        createServiceFarePlan({
            farePlanName,
            startKm,
            upToKm,
            pricePerKm,
            waitingPricePerMinute,
            applyPeakFare,
            applyNightFare,
            nightFareStart,
            nightFareEnd,
            nightFare,
            mondayPeakFareStartTime,
            mondayPeakFareEndTime,
            mondayPeakFare,
            tuesdayPeakFareStartTime,
            tuesdayPeakFareEndTime,
            tuesdayPeakFare,
            wednesdayPeakFareStartTime,
            wednesdayPeakFareEndTime,
            wednesdayPeakFare,
            thursdayPeakFareStartTime,
            thursdayPeakFareEndTime,
            thursdayPeakFare,
            fridayPeakFareStartTime,
            fridayPeakFareEndTime,
            fridayPeakFare,
            saturdayPeakFareStartTime,
            saturdayPeakFareEndTime,
            saturdayPeakFare,
            sundayPeakFareStartTime,
            sundayPeakFareEndTime,
            sundayPeakFare,
            token
        })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
                    this.setState({
                        farePlanName: '',
                        startKm: '',
                        upToKm: '',
                        pricePerKm: '',
                        waitingPricePerMinute: '',
                        applyPeakFare: 'INACTIVE',
                        applyNightFare: 'INACTIVE',
                        nightFareStart: '',
                        nightFareEnd: '',
                        nightFare: '',
                        mondayPeakFareStartTime: '',
                        mondayPeakFareEndTime: '',
                        mondayPeakFare: '',
                        tuesdayPeakFareStartTime: '',
                        tuesdayPeakFareEndTime: '',
                        tuesdayPeakFare: '',
                        wednesdayPeakFareStartTime: '',
                        wednesdayPeakFareEndTime: '',
                        wednesdayPeakFare: '',
                        thursdayPeakFareStartTime: '',
                        thursdayPeakFareEndTime: '',
                        thursdayPeakFare: '',
                        fridayPeakFareStartTime: '',
                        fridayPeakFareEndTime: '',
                        fridayPeakFare: '',
                        saturdayPeakFareStartTime: '',
                        saturdayPeakFareEndTime: '',
                        saturdayPeakFare: '',
                        sundayPeakFareStartTime: '',
                        sundayPeakFareEndTime: '',
                        sundayPeakFare: '',                        
                        serverMsg: res.message,
                        serverStatus: 'OK'
                    })
                } else {
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ serverMsg: res.messsage, serverStatus: 'ERROR' })
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realización la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realización la acción', serverStatus: 'ERROR' })
            })
    }

    farePlanChange = (e) => this.setState({ farePlanName: e.target.value })
    startKmChange = (e) => this.setState({ startKm: e.target.value })
    upToKmChange = (e) => this.setState({ upToKm: e.target.value })
    pricePerKmChange = (e) => this.setState({ pricePerKm: e.target.value })
    waitingPricePerMinuteChange = (e) => this.setState({ waitingPricePerMinute: e.target.value })
    applyPeakFareChange = (e) => this.setState({ applyPeakFare: e.target.value })
    applyNightFareChange = (e) => this.setState({ applyNightFare: e.target.value })
    nightFareStartChange = (time) => this.setState({ nightFareStart: time })
    nightFareEndChange = (time) => this.setState({ nightFareEnd: time })
    nightFareChange = (e) => this.setState({ nightFare: e.target.value })

    mondayPeakFareStartTimeChange = (time) => this.setState({ mondayPeakFareStartTime: time })
    mondayPeakFareEndTimeChange = (time) => this.setState({ mondayPeakFareEndTime: time })
    mondayPeakFareChange = (e) => this.setState({ mondayPeakFare: e.target.value })
    tuesdayPeakFareStartTimeChange = (time) => this.setState({ tuesdayPeakFareStartTime: time })
    tuesdayPeakFareEndTimeChange = (time) => this.setState({ tuesdayPeakFareEndTime: time })
    tuesdayPeakFareChange = (e) => this.setState({ tuesdayPeakFare: e.target.value })
    wednesdayPeakFareStartTimeChange = (time) => this.setState({ wednesdayPeakFareStartTime: time })
    wednesdayPeakFareEndTimeChange = (time) => this.setState({ wednesdayPeakFareEndTime: time })
    wednesdayPeakFareChange = (e) => this.setState({ wednesdayPeakFare: e.target.value })
    thursdayPeakFareStartTimeChange = (time) => this.setState({ thursdayPeakFareStartTime: time })
    thursdayPeakFareEndTimeChange = (time) => this.setState({ thursdayPeakFareEndTime: time })
    thursdayPeakFareChange = (e) => this.setState({ thursdayPeakFare: e.target.value })
    fridayPeakFareStartTimeChange = (time) => this.setState({ fridayPeakFareStartTime: time })
    fridayPeakFareEndTimeChange = (time) => this.setState({ fridayPeakFareEndTime: time })
    fridayPeakFareChange = (e) => this.setState({ fridayPeakFare: e.target.value })
    saturdayPeakFareStartTimeChange = (time) => this.setState({ saturdayPeakFareStartTime: time })
    saturdayPeakFareEndTimeChange = (time) => this.setState({ saturdayPeakFareEndTime: time })
    saturdayPeakFareChange = (e) => this.setState({ saturdayPeakFare: e.target.value })
    sundayPeakFareStartTimeChange = (time) => this.setState({ sundayPeakFareStartTime: time })
    sundayPeakFareEndTimeChange = (time) => this.setState({ sundayPeakFareEndTime: time })
    sundayPeakFareChange = (e) => this.setState({ sundayPeakFare: e.target.value })


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
                            <li className="breadcrumb-item"><Link to={"/admin/serviceFarePlans"}>Planes Tarifarios</Link></li>
                            <li className="breadcrumb-item " aria-current="page">Añadir</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Añadir Plan Tarifario</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Nombre del Plan Tarifario</label>
                                                <input value={this.state.farePlanName} onChange={this.farePlanChange} type="text" className="form-control" autoComplete="off" placeholder="Nombre del plan tarifario" />
                                            </div>
                                            <div className="form-group">
                                                <label>Desde Km</label>
                                                <input value={this.state.startKm} onChange={this.startKmChange} type="number" className="form-control" autoComplete="off" placeholder="Considerar desde cantidad de Km" />
                                            </div>
                                            <div className="form-group">
                                                <label>Hasta Km</label>
                                                <input value={this.state.upToKm} onChange={this.upToKmChange} type="number" className="form-control" autoComplete="off" placeholder="Considerar hasta cantidad de Km" />
                                            </div>
                                            <div className="form-group">
                                                <label>Precio por Km ($)</label>
                                                <input value={this.state.pricePerKm} onChange={this.pricePerKmChange} type="number" className="form-control" autoComplete="off" placeholder="Precio por Km" />
                                            </div>
                                            <div className="form-group">
                                                <label>Precio por Minuto de Espera ($)</label>
                                                <input value={this.state.waitingPricePerMinute} onChange={this.waitingPricePerMinuteChange} type="number" className="form-control" autoComplete="off" placeholder="Precio por Minuto de Espera" />
                                            </div>
                                            <div className="form-group">
                                                <label>Aplicar Tarifa de Hora Pico</label>
                                                <select value={this.state.applyPeakFare} onChange={this.applyPeakFareChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="ACTIVE" >Aplicar</option>
                                                    <option value="INACTIVE" >No aplicar</option>
                                                </select>
                                            </div>
                                            {
                                                this.state.applyPeakFare === 'ACTIVE'
                                                    ?
                                                    <div className="form-group">
                                                        <label>Detalles de la Tarifa de Hora Pico</label>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Lunes:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.mondayPeakFareStartTime} onChange={this.mondayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.mondayPeakFareEndTime} onChange={this.mondayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.mondayPeakFare} onChange={this.mondayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Martes:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.tuesdayPeakFareStartTime} onChange={this.tuesdayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.tuesdayPeakFareEndTime} onChange={this.tuesdayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.tuesdayPeakFare} onChange={this.tuesdayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Miércoles:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.wednesdayPeakFareStartTime} onChange={this.wednesdayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.wednesdayPeakFareEndTime} onChange={this.wednesdayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.wednesdayPeakFare} onChange={this.wednesdayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Jueves:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.thursdayPeakFareStartTime} onChange={this.thursdayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.thursdayPeakFareEndTime} onChange={this.thursdayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.thursdayPeakFare} onChange={this.thursdayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Viernes:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.fridayPeakFareStartTime} onChange={this.fridayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.fridayPeakFareEndTime} onChange={this.fridayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.fridayPeakFare} onChange={this.fridayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Sábado:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.saturdayPeakFareStartTime} onChange={this.saturdayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.saturdayPeakFareEndTime} onChange={this.saturdayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.saturdayPeakFare} onChange={this.saturdayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                        <div className="dayFareContainer">
                                                            <label style={{ width: '25%' }}>Domingo:</label>
                                                            <TimePicker className="time-picker-sm" value={this.state.sundayPeakFareStartTime} onChange={this.sundayPeakFareStartTimeChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker-sm" value={this.state.sundayPeakFareEndTime} onChange={this.sundayPeakFareEndTimeChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '25%' }} value={this.state.sundayPeakFare} onChange={this.sundayPeakFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa (%)" />
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                            <div className="form-group">
                                                <label>Aplicar Tarifa Nocturna</label>
                                                <select value={this.state.applyNightFare} onChange={this.applyNightFareChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="ACTIVE" >Aplicar</option>
                                                    <option value="INACTIVE" >No aplicar</option>
                                                </select>
                                            </div>
                                            {
                                                this.state.applyNightFare === 'ACTIVE'
                                                    ?
                                                    <div className="form-group">
                                                        <label>Detalles de la Tarifa Nocturna</label>
                                                        <div style={{ display: 'flex' }}>
                                                            <TimePicker className="time-picker" value={this.state.nightFareStart} onChange={this.nightFareStartChange} disableClock={true} clearIcon={null} />
                                                            <TimePicker className="time-picker" value={this.state.nightFareEnd} onChange={this.nightFareEndChange} disableClock={true} clearIcon={null} />
                                                            <input style={{ width: '33.3%' }} value={this.state.nightFare} onChange={this.nightFareChange} type="number" className="form-control" autoComplete="off" placeholder="Tarifa Noctura (%)" />
                                                        </div>
                                                    </div>
                                                    : null
                                            }

                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Añadir Plan Tarifario</button>
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
export default connect(mapStateToProps)(withRouter(AddFarePlan))
