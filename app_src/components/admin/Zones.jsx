import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getZones, deleteZone } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { PlusCircle } from 'react-feather';
import moment from 'moment'


class Zones extends Component {

    state = {
        zones: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Zonas de Operación"
        const { token } = this.props

        getZones({ token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, zones: res.payload })
                }
            })
    }

    handleAddZone = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addZone')
    }

    handleDeleteZone = (zoneId) => {
        const { token } = this.props
        const { zones } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar la zona de operación?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteZone({ zoneId, token })
                        this.setState({
                            zones: zones.filter(z => z.id !== zoneId)
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
        const { zones, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Zonas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Todas</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Zonas de Operación</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="zonesTable"
                                            filename="zones"
                                            sheet="zones"
                                            buttonText="Excel"
                                        />
                                        <div style={{ float: "right", display: 'flex' }}>
                                            {/* <div style={{ marginRight: '10px', alignItems: 'center', display: 'flex' }}>Buscar:</div>
                                            <input style={{ width: '200px', marginRight: '10px' }} type="text" className="form-control" autoComplete="off" placeholder="Buscar..." /> */}
                                            <button onClick={this.handleAddZone} type="button" className="btn btn-primary btn-icon-text mb-2 mb-md-0"><PlusCircle size="16" /> Añadir Zona</button>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="zonesTable">
                                            <thead>
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Nombre de la Zona</td>
                                                    <td>País</td>
                                                    <td>Estado</td>
                                                    <td>Ciudad</td>
                                                    <td>Divisa</td>
                                                    <td>Status</td>
                                                    <td>Fecha de creación</td>
                                                    <td>Acción</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    zones && zones.length > 0
                                                        ?
                                                        zones.map((zone, index) => (
                                                            <tr key={index}>
                                                                <td>{zone.id}</td>
                                                                <td>{zone.name}</td>
                                                                <td>{zone.country}</td>
                                                                <td>{zone.state}</td>
                                                                <td>{'city' in zone && zone.city != null ? zone.city : '-'}</td>
                                                                <td>{zone.currency}</td>
                                                                <td>{zone.status}</td>
                                                                <td>{moment(zone.createdAt).format('DD/MM/YY HH:mm')}</td>
                                                                <td>
                                                                    <Link to={`/admin/zone/${zone.id}`} className="btn btn-primary mb-1 mb-md-0 action-btn"><i className="fa fa-search btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteZone(zone.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
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
export default connect(mapStateToProps)(Zones)
