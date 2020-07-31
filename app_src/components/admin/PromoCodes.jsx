import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'

// API
import { getPromoCodes, deletePromoCode } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import moment from 'moment'

import { PlusCircle } from 'react-feather';


class PromoCodes extends Component {

    state = {
        promoCodes: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Códigos Promocionales"
        const { token } = this.props

        getPromoCodes({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, promoCodes: res.payload })
                }
            })
    }

    handleAddPromoCode = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addPromoCode')
    }

    handleDeletePromoCode = (promoCodeId) => {
        const { token } = this.props
        const { promoCodes } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar el Código Promocional?',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deletePromoCode({ promoCodeId, token })
                        this.setState({
                            promoCodes: promoCodes.filter(p => p.id !== promoCodeId)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });

    }

    render() {
        const { promoCodes, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Códigos Promocionales</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todos</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Códigos Promocionales</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="promoCodesTable"
                                            filename="promo_codes"
                                            sheet="promo_codes"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddPromoCode} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Código</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="promoCodesTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Código Promocional</td>
                                                    <td>Descuento (%)</td>
                                                    <td>Fecha de Expiración</td>
                                                    <td>Estado</td>
                                                    <td>No. veces usado</td>                                                    
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    promoCodes && promoCodes.length > 0
                                                        ?
                                                        promoCodes.map((promoCode, index) => (
                                                            <tr key={index}>
                                                                <td>{promoCode.id}</td>
                                                                <td>{promoCode.code}</td>
                                                                <td>{parseFloat(promoCode.discount)}</td>
                                                                <td>{moment(promoCode.expDate).format('DD/MM/YY HH:mm')}</td>
                                                                <td>{promoCode.status}</td>
                                                                <td>{promoCode.usedCount}</td>
                                                                <td>
                                                                    <Link to={`/admin/promoCode/${promoCode.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeletePromoCode(promoCode.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
                                                                </td>
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
export default connect(mapStateToProps)(PromoCodes)
