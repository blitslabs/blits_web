import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DateTimePicker from 'react-datetime-picker'
import { toast } from 'react-toastify'

// API
import { getPromoCodeDetails, updatePromoCode, getZones } from '../../utils/api'

class EditUser extends Component {

    state = {
        code: '',
        discount: '',
        expDate: '',
        limitAmount: '',
        limitRedeemTimes: '',
        targetUser: '',
        zoneId: '',
        zones: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Código Promocional"
        const { token } = this.props
        const { promoCodeId } = this.props.match.params

        getPromoCodeDetails({ promoCodeId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    const promoCode = res.payload
                    getZones({ token })
                        .then(data => data.json())
                        .then((res) => {
                            this.setState({
                                code: promoCode.code,
                                discount: promoCode.discount,
                                expDate: promoCode.expDate,
                                limitAmount: promoCode.limitAmount,
                                limitRedeemTimes: promoCode.limitRedeemTimes,
                                targetUser: promoCode.targetUser,
                                zoneId: promoCode.zoneId,
                                zones: res.payload,
                                loading: false
                            })
                        })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { code, discount, expDate, limitAmount, limitRedeemTimes, targetUser, zoneId } = this.state
        const { token } = this.props
        const { promoCodeId } = this.props.match.params

        if (!promoCodeId|| !code || !discount || !expDate || !limitAmount || !limitRedeemTimes || !targetUser || !zoneId) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        if(isNaN(discount) || discount <= 0) {
            toast.error('Ingresa porcentage descuento válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa porcentage descuento válido', serverStatus: 'ERROR' })
            return
        }

        if(isNaN(limitAmount) || limitAmount <= 0) {
            toast.error('Ingresa una cantidad máximo de descuento válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa una cantidad máximo de descuento válida', serverStatus: 'ERROR' })
            return
        }

        if(isNaN(limitRedeemTimes) || limitRedeemTimes <= 0) {
            toast.error('Ingresa un número máximo de usos válido', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa un número máximo de usos válido', serverStatus: 'ERROR' })
            return
        }

        updatePromoCode({ promoCodeId, code, discount, expDate, limitAmount, limitRedeemTimes, targetUser, zoneId, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.messsage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        code: '',
                        discount: '',
                        expDate: '',
                        limitAmount: '',
                        limitRedeemTimes: '',
                        targetUser: '',
                        zoneId: '',
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

    handleCodeChange = (e) => this.setState({ code: e.target.value })
    handleDiscountChange = (e) => this.setState({ discount: e.target.value })
    handleExpDateChange = (date) => this.setState({ expDate: date })
    handleLimitAmountChange = (e) => this.setState({limitAmount: e.target.value})
    handleLimitRedeemTimesChange = (e) => this.setState({limitRedeemTimes: e.target.value})
    handleTargetUserChange = (e) => this.setState({targetUser: e.target.value})
    handleZoneIdChange = (e) => this.setState({zoneId: e.target.value})

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
                            <li className="breadcrumb-item"><a href="#">Códigos Promocionales</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Editar Código Promocional</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Código Promocional</label>
                                                <input value={this.state.code} onChange={this.handleCodeChange} type="text" className="form-control" autoComplete="off" placeholder="Código Promocional" />
                                            </div>
                                            <div className="form-group">
                                                <label>Descuento (%)</label>
                                                <input value={this.state.discount} onChange={this.handleDiscountChange} type="number" className="form-control" autoComplete="off" placeholder="Descuento" />
                                            </div>
                                            <div className="form-group">
                                                <label>Fecha de Expiración</label>
                                                <div stlye={{ display: 'block' }}>
                                                    <DateTimePicker
                                                        className="date-picker"
                                                        onChange={this.handleExpDateChange}
                                                        value={this.state.expDate}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Cantidad Máximo de Descuento ($)</label>
                                                <input value={this.state.limitAmount} onChange={this.handleLimitAmountChange} type="number" className="form-control" autoComplete="off" placeholder="Cantidad Máximo de Descuento" />
                                            </div>
                                            <div className="form-group">
                                                <label>Número Máximo de Usos (Número)</label>
                                                <input value={this.state.limitRedeemTimes} onChange={this.handleLimitRedeemTimesChange} type="number" className="form-control" autoComplete="off" placeholder="Número Máximo de Usos" />
                                            </div>
                                            <div className="form-group">
                                                <label>Usuario Objetivo</label>
                                                <select value={this.state.targetUser} onChange={this.handleTargetUserChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    <option value="NEW_USER" >Nuevos usuarios</option>
                                                    <option value="ALL" >Todos los usuarios</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Zona</label>
                                                <select value={this.state.zoneId} onChange={this.handleZoneIdChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    {
                                                        this.state.zones &&
                                                        this.state.zones.map((zone, i) => (
                                                            <option key={i} value={zone.id}>{zone.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>                                            
                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Usuario</button>
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
export default connect(mapStateToProps)(EditUser)
