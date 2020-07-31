import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getPaymentSettings, updatePaymentSettings, getCurrencies } from '../../utils/api'


class PaymentSettings extends Component {

    state = {
        dailyTarget: '',
        taxPercentage: '',
        surgeTriggerPoint: '',
        surgePercentage: '',
        comissionPercentage: '',
        currency: '',
        bookingIdPrefix: '',
        currencies: '',
        serverMsg: '',
        serverStatus: '',
        loading: true,
    }

    componentDidMount() {
        document.title = "Configuración de Pagos"
        const { token } = this.props

        getPaymentSettings({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK' && 'payload' in res) {
                    const settings = res.payload
                    getCurrencies({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            this.setState({
                                loading: false,
                                dailyTarget: settings.dailyTarget,
                                taxPercentage: settings.taxPercentage,
                                surgeTriggerPoint: settings.surgeTriggerPoint,
                                surgePercentage: settings.surgePercentage,
                                comissionPercentage: settings.comissionPercentage,
                                currency: settings.currency,
                                bookingIdPrefix: settings.bookingIdPrefix,
                                currencies: res2.payload,
                            })
                        })
                } else {
                    this.setState({
                        loading: false,
                    })
                }
            })
    }



    handleSubmitBtn = (e) => {
        e.preventDefault()

        const { token } = this.props

        const {
            dailyTarget, taxPercentage, surgeTriggerPoint,
            surgePercentage, comissionPercentage, currency, bookingIdPrefix
        } = this.state

        if (!dailyTarget || isNaN(dailyTarget) || dailyTarget < 0) {
            toast.error('Ingresa un objetivo diario válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un objetivo diario válido' })
            return
        }

        if (!taxPercentage || isNaN(taxPercentage) || taxPercentage < 0) {
            toast.error('Ingresa un porcentaje de impuestos válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un porcentaje de impuestos válido' })
            return
        }

        if (!surgeTriggerPoint) {
            toast.error('Ingresa un punto de activación de sobre demanda válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un punto de activación de sobre demanda válido' })
            return
        }

        if (!surgePercentage || isNaN(surgePercentage) || surgePercentage < 0) {
            toast.error('Ingresa URL de la app de conductores en Google Play', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa URL de la app de conductores en Google Play' })
            return
        }

        if (!comissionPercentage || isNaN(comissionPercentage) || comissionPercentage < 0) {
            toast.error('Ingresa un porcentaje de comisión válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Ingresa un porcentaje de comisión válido' })
            return
        }

        if (!currency) {
            toast.error('Selecciona una divisa', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona una divisa' })
            return
        }

        if (!bookingIdPrefix) {
            toast.error('Selecciona un prefijo válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverStatus: 'ERROR', serverMsg: 'Selecciona un prefijo válido' })
            return
        }

        updatePaymentSettings({
            dailyTarget, taxPercentage, surgeTriggerPoint,
            surgePercentage, comissionPercentage, currency, bookingIdPrefix,
            token
        })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        dailyTarget: '',
                        taxPercentage: '',
                        surgeTriggerPoint: '',
                        surgePercentage: '',
                        comissionPercentage: '',
                        currency: '',
                        bookingIdPrefix: '',
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

    dailyTargetChange = (e) => this.setState({ dailyTarget: e.target.value })
    taxPercentageChange = (e) => this.setState({ taxPercentage: e.target.value })
    surgeTriggerPointChange = (e) => this.setState({ surgeTriggerPoint: e.target.value })
    surgePercentageChange = (e) => this.setState({ surgePercentage: e.target.value })
    comissionPercentageChange = (e) => this.setState({ comissionPercentage: e.target.value })
    currencyChange = (e) => this.setState({ currency: e.target.value })
    bookingIdPrefixChange = (e) => this.setState({ bookingIdPrefix: e.target.value })

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
                            <li className="breadcrumb-item " aria-current="page">Pagos</li>

                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Configuración de Pagos</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Objetivo Diario</label>
                                                <input onChange={this.dailyTargetChange} required="required" value={this.state.dailyTarget} type="number" className="form-control" autoComplete="off" placeholder="Objetivo diario" />
                                            </div>
                                            <div className="form-group">
                                                <label>Porcentaje de Impuestos (%)</label>
                                                <input onChange={this.taxPercentageChange} required="required" value={this.state.taxPercentage} type="number" className="form-control" autoComplete="off" placeholder="Porcentaje de impuestos" />
                                            </div>
                                            <div className="form-group">
                                                <label>Surge Trigger Point (Número)</label>
                                                <input onChange={this.surgeTriggerPointChange} required="required" value={this.state.surgeTriggerPoint} type="number" className="form-control" autoComplete="off" placeholder="Surge trigger point" />
                                            </div>
                                            <div className="form-group">
                                                <label>Surge Percentage (%)</label>
                                                <input onChange={this.surgePercentageChange} required="required" value={this.state.surgePercentage} type="number" className="form-control" autoComplete="off" placeholder="Surge percentage" />
                                            </div>
                                            <div className="form-group">
                                                <label>Porcentaje de Comisión (%)</label>
                                                <input onChange={this.comissionPercentageChange} required="required" value={this.state.comissionPercentage} type="number" className="form-control" autoComplete="off" placeholder="Porcentaje de comisión" />
                                            </div>
                                            <div className="form-group">
                                                <label>Prefijo de ID de reserva</label>
                                                <input onChange={this.bookingIdPrefixChange} required="required" value={this.state.bookingIdPrefix} type="text" className="form-control" autoComplete="off" placeholder="Prefijo de ID de reserva" />
                                            </div>
                                            <div className="form-group">
                                                <label>Divisas</label>
                                                <select onChange={this.currencyChange} value={this.state.currency} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Seleccionar opción</option>
                                                    {
                                                        this.state.currencies &&
                                                        this.state.currencies.map((currency, i) => (
                                                            <option key={i} value={currency.symbol}>{currency.name}</option>
                                                        ))
                                                    }
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
export default connect(mapStateToProps)(PaymentSettings)