import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getPromoCodes, getPromoCodeTxs } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment'

import { PlusCircle } from 'react-feather';


class PromoCodeTxs extends Component {

    state = {
        promoCodes: '',
        promoCodeTxs: '',
        selectedPromoCode: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Registros de Uso de Códigos Promocionales"
        const { token } = this.props

        getPromoCodes({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                   
                    const promoCodes = res.payload
                    if (promoCodes && promoCodes.length > 0) {
                        
                        getPromoCodeTxs({ code: promoCodes[0].code, page: 1, token })
                            .then(data => data.json())
                            .then((res) => {
                                console.log(res.payload)
                                this.setState({
                                    loading: false,
                                    selectedPromoCode: promoCodes[0].code,
                                    promoCodes,
                                    promoCodeTxs: res.payload
                                })
                            })

                    } else {
                        this.setState({
                            loading: false,
                            promoCodes,
                            selectedPromoCode: '',
                            promoCodeTxs: ''
                        })
                    }
                }
            })
    }

    handlePromoCodeChange = (e) => {
        const { token } = this.props
        const code = e.target.value
        
        getPromoCodeTxs({ code, page: 1, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res.payload)
                this.setState({
                    loading: false,
                    selectedPromoCode: code,                   
                    promoCodeTxs: res.payload
                })
            })
        this.setState({ selectedPromoCode: e.target.value })
    }

    render() {
        const { promoCodeTxs, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Registros de Uso de Códigos Promocionales</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Registros de Uso de Códigos Promocionales</h6>
                                    <div className="row" style={{ marginBottom: '20px' }}>
                                        <div className="col-md-4 col-sm-12 col-xs-12">
                                            <div className="form-group">
                                                <label>Seleccionar Código Promocional</label>
                                                <select value={this.state.selectedPromoCode} onChange={this.handlePromoCodeChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    {
                                                        this.state.promoCodes &&
                                                        this.state.promoCodes.map((promoCode, i) => (
                                                            <option key={i} value={promoCode.code}>{promoCode.code}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="promoCodeTxsTable"
                                            filename="promo_code_txs"
                                            sheet="promo_code_txs"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                           
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="promoCodeTxsTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Código Promocional</td>
                                                    <td>Usuario (Nombre)</td>
                                                    <td>Descuento ($)</td>
                                                    <td>Estado</td>
                                                    <td>Fecha de Uso</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    promoCodeTxs && promoCodeTxs.length > 0
                                                        ?
                                                        promoCodeTxs.map((tx, index) => (
                                                            <tr key={index}>
                                                                <td>{tx.id}</td>
                                                                <td>{tx.code}</td>
                                                                <th>{tx.user.name}</th>
                                                                <td>${parseFloat(tx.discountAmount)} {tx.currency}</td>
                                                                <td>{tx.status}</td>
                                                                <td>{moment(tx.createdAt).format('DD/MM/YY HH:mm')}</td>
                                                            </tr>
                                                        ))
                                                        :
                                                        <tr>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                            <td>-</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
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
export default connect(mapStateToProps)(PromoCodeTxs)
