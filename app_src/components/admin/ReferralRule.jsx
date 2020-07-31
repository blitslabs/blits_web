import React, { Component } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getReferralRule, updateReferralRule } from '../../utils/api'

class ReferralRule extends Component {

    state = {
        referralDiscountPercentage: '',        
        loading: true
    }

    componentDidMount() {
        document.title = "Regla de Referidos"
        const { token } = this.props

        getReferralRule({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        referralDiscountPercentage: parseFloat(res.payload.referralDiscountPercentage),                        
                        loading: false
                    })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { referralDiscountPercentage } = this.state
        const { token } = this.props

        if (!referralDiscountPercentage || isNaN(referralDiscountPercentage) || referralDiscountPercentage < 0) {
            toast.error('Ingresa una cantidad mínima para redimir los puntos válida', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa una cantidad mínima para redimir los puntos válida', serverStatus: 'ERROR' })
            return
        }       

        updateReferralRule({ referralDiscountPercentage, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status == 'OK') {
                    console.log(res.status)
                    toast.success( res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        referralDiscountPercentage: '',                        
                        serverMsg: res.message,
                        serverStatus: 'OK'
                    })
                } else {
                    toast.error( res.messsage, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ serverMsg: res.messsage, serverStatus: 'ERROR' })
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realización la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realización la acción', serverStatus: 'ERROR' })
            })
    }

    referralDiscountPercentageChange = (e) => this.setState({ referralDiscountPercentage: e.target.value })    

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
                            <li className="breadcrumb-item"><a href="#">Regla de Referidos</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Regla de Referidos</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Porcentaje de Descuento de Referidos (%)</label>
                                                <input value={this.state.referralDiscountPercentage} onChange={this.referralDiscountPercentageChange} type="number" className="form-control" autoComplete="off" placeholder="Porcentaje de Descuento de Referidos (%)" />
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
export default connect(mapStateToProps)(ReferralRule)
