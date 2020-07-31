import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// Libraries
import csc from 'country-state-city'

// API
import { getAccountDetails, updateAccount } from '../../utils/api'

class EditAccount extends Component {

    state = {
        accountName: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        country: '',
        paypalId: '',
        serverMsg: '',
        serverStatus: '',
        countries: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Cuenta"
        const { token } = this.props
        const { accountId } = this.props.match.params
        const countries = csc.getAllCountries()

        getAccountDetails({ accountId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {

                    this.setState({
                        accountName: res.payload.accountName,
                        bankName: res.payload.bankName,
                        accountNumber: res.payload.accountNumber,
                        routingNumber: res.payload.routingNumber != null ? res.payload.routingNumber : '',
                        accountType: res.payload.accountType,
                        country: res.payload.country,
                        paypalId: res.payload.paypalId,
                        countries,
                        loading: false
                    })

                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { accountName, bankName, accountNumber, routingNumber, accountType, country, paypalId } = this.state
        const { accountId } = this.props.match.params
        const { token } = this.props

        if (accountType === 'BANK' && (!accountName || !bankName || !accountNumber || !country)) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        if (accountType === 'PAYPAL' && (!paypalId || !country)) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateAccount({ accountId, accountName, bankName, accountNumber, routingNumber, accountType, country, paypalId, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.messsage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        accountName: '',
                        bankName: '',
                        accountNumber: '',
                        routingNumber: '',                        
                        country: '',
                        paypalId: '',
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

    accountNameChange = (e) => this.setState({ accountName: e.target.value })
    bankNameChange = (e) => this.setState({ bankName: e.target.value })
    accountNumberChange = (date) => this.setState({ accountNumber: date })
    routingNumberChange = (e) => this.setState({ routingNumber: e.target.value })
    paypalIdChange = (e) => this.setState({ paypalId: e.target.value })
    countryChange = (e) => this.setState({ country: e.target.value })


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
                            <li className="breadcrumb-item"><a href="#">Cuentas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Editar Cuenta</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            {
                                                this.state.accountType === 'BANK'
                                                    ?
                                                    <Fragment>
                                                        <div className="form-group">
                                                            <label>Titular de la Cuenta</label>
                                                            <input value={this.state.accountName} onChange={this.accountNameChange} type="text" className="form-control" autoComplete="off" placeholder="Titular de la Cuenta" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Nombre del Banco</label>
                                                            <input value={this.state.bankName} onChange={this.bankNameChange} type="text" className="form-control" autoComplete="off" placeholder="Nombre del Banco" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Número de Cuenta</label>
                                                            <input value={this.state.accountNumber} onChange={this.accountNumberChange} type="number" className="form-control" autoComplete="off" placeholder="Número de Cuenta" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Número de Ruta</label>
                                                            <input value={this.state.routingNumber} onChange={this.routingNumberChange} type="number" className="form-control" autoComplete="off" placeholder="Número de Ruta" />
                                                        </div>
                                                    </Fragment>
                                                    :
                                                    <div className="form-group">
                                                        <label>ID de Paypal</label>
                                                        <input value={this.state.paypalId} onChange={this.paypalIdChange} type="text" className="form-control" autoComplete="off" placeholder="ID de Paypal" />
                                                    </div>
                                            }
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">País</label>
                                                <select value={this.state.country} onChange={this.countryChange} placeholder="Seleccionar País" className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="">Seleccionar País</option>
                                                    {
                                                        this.state.countries &&
                                                        this.state.countries.map((country, i) => (
                                                            <option key={i} value={country.name}>{country.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            

                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Cuenta</button>
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
export default connect(mapStateToProps)(EditAccount)
