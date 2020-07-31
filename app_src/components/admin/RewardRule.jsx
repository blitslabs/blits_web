import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getRewardRule, updateRewardRule } from '../../utils/api'

class RewardRule extends Component {

    state = {
        minimumPointsToRedeem: '',
        rewardPointsPercentage: '',
        pointRedeemPrice: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Regla de Recompensa"
        const { token } = this.props

        getRewardRule({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        minimumPointsToRedeem: parseFloat(res.payload.minimumPointsToRedeem),
                        rewardPointsPercentage: parseFloat(res.payload.rewardPointsPercentage),
                        pointRedeemPrice: parseFloat(res.payload.pointRedeemPrice),
                        loading: false
                    })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { minimumPointsToRedeem, rewardPointsPercentage, pointRedeemPrice } = this.state
        const { token } = this.props

        if (!minimumPointsToRedeem || isNaN(minimumPointsToRedeem) || minimumPointsToRedeem <= 0) {
            toast.error('Ingresa una cantidad mínima para redimir los puntos válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa una cantidad mínima para redimir los puntos válida', serverStatus: 'ERROR' })
            return
        }

        if (!rewardPointsPercentage || isNaN(rewardPointsPercentage) || rewardPointsPercentage < 0) {
            toast.error('Ingresa el porcentaje de puntos generados por cada pago', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa el porcentaje de puntos generados por cada pago', serverStatus: 'ERROR' })
            return
        }

        if (!pointRedeemPrice || isNaN(pointRedeemPrice) || pointRedeemPrice < 0) {
            toast.error('Ingresa una cantidad válida para el número de puntos necesarios para obtener una unidad de dinero', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa una cantidad válida para el número de puntos necesarios para obtener una unidad de dinero', serverStatus: 'ERROR' })
            return
        }

        updateRewardRule({ minimumPointsToRedeem, rewardPointsPercentage, pointRedeemPrice, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        minimumPointsToRedeem: '',
                        rewardPointsPercentage: '',
                        pointRedeemPrice: '',
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

    minimumPointsToRedeemChange = (e) => this.setState({ minimumPointsToRedeem: e.target.value })
    rewardPointsPercentageChange = (e) => this.setState({ rewardPointsPercentage: e.target.value })
    pointRedeemPriceChange = (e) => this.setState({ pointRedeemPrice: e.target.value })

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
                            <li className="breadcrumb-item"><a href="#">Regla de Recompensas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Regla de Recompensas</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Puntos mínimos para canjear (Número)</label>
                                                <input value={this.state.minimumPointsToRedeem} onChange={this.minimumPointsToRedeemChange} type="number" className="form-control" autoComplete="off" placeholder="Cantidad mínima de puntos" />
                                            </div>
                                            <div className="form-group">
                                                <label>Porcentaje de puntos generados por pago (%)</label>
                                                <input value={this.state.rewardPointsPercentage} onChange={this.rewardPointsPercentageChange} type="number" className="form-control" autoComplete="off" placeholder="Porcentaje de puntos generados" />
                                            </div>
                                            <div className="form-group">
                                                <label>Cantidad de puntos equivalente a una unidad de dinero (Número)</label>
                                                <input value={this.state.pointRedeemPrice} onChange={this.pointRedeemPriceChange} type="number" className="form-control" autoComplete="off" placeholder="Precio de los puntos de recompensa" />
                                            </div>
                                            
                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Regla</button>
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
export default connect(mapStateToProps)(RewardRule)
