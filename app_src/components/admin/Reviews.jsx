import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import ReactLoading from 'react-loading';

// Components
import Loading from '../Loading'

// API
import { getReviews } from '../../utils/api'

// Libraries
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PlusCircle } from 'react-feather';


class Reviews extends Component {

    state = {
        reviews: '',
        userType: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Reseñas"
        const { token } = this.props
        let { userType, page } = this.props.match.params
        page = page ? page : 1
        const reviewType = userType === 'users' ? 'DRIVER_TO_USER' : 'USER_TO_DRIVER'
        getReviews({ reviewType, page, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loading: false, reviews: res.payload, userType })
                }
            })
    }

    handleAddDocument = (e) => {
        e.preventDefault()
        this.props.history.push('/admin/addRequiredDocument')
    }

    handleDeleteDocument = (documentId) => {
        const { token } = this.props
        const { reviews } = this.state

        confirmAlert({
            title: 'Confirmación',
            message: '¿Estás seguro que quieres eliminar el documento?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deleteRequiredDocument({ documentId, token })
                        this.setState({
                            reviews: reviews.filter(document => document.id !== documentId)
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
        const { reviews, userType, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Reseñas</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{userType === 'users' ? 'Usuarios' : 'Conductores'}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Documentos Requeridos</h6>
                                    <div style={{ marginBottom: '10px' }}>
                                        <ReactHTMLTableToExcel
                                            className="btn btn-light mb-1 "
                                            table="reviewsTable"
                                            filename="reviews"
                                            sheet="reviews"
                                            buttonText="Excel"
                                        />
                                        
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="reviewsTable">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Viaje (ID)</th>
                                                    <th>Usuario (Nombre)</th>
                                                    <th>Conductor (Nombre)</th>
                                                    <th>Calificación</th>
                                                    <th>Fecha y Hora</th>
                                                    <th>Comentarios</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reviews && reviews.length > 0
                                                        ?
                                                        reviews.map((review, index) => (
                                                            <tr key={index}>
                                                                <td>{review.id}</td>
                                                                <td>{review.rideId}</td>
                                                                <td>{review.user.name}</td>
                                                                <td>{review.driver.name}</td>
                                                                <th>{review.rating}</th>
                                                                <td>
                                                                    <Link to={`/admin/requiredDocument/${document.id}/edit`} className="btn btn-success mb-1 mb-md-0 action-btn"><i className="fa fa-edit btn-icon"></i></Link>
                                                                    <button onClick={e => { e.preventDefault(); this.handleDeleteDocument(document.id) }} type="button" className="btn btn-danger mb-1 mb-md-0 action-btn"><i className="fa fa-trash btn-icon"></i></button>
                                                                </td>
                                                                <td>{review.comments}</td>
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
export default connect(mapStateToProps)(Reviews)
