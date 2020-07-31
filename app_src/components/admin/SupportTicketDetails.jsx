import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import { toast } from 'react-toastify'

// API
import { getSupportTicketDetails, updateSupportTicket } from '../../utils/api'



class SupportTicketDetails extends Component {

    state = {
        ticket: '',
        name: '',
        email: '',
        title: '',
        message: '',
        topic: '',
        status: '',
        reply: '',
        serverMsg: '',
        serverStatus: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Detalles del Ticket"
        const { token } = this.props
        let { ticketId } = this.props.match.params

        getSupportTicketDetails({ ticketId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        name: res.payload.user.name,
                        email: res.payload.user.email,
                        title: res.payload.title,
                        message: res.payload.message,
                        topic: res.payload.topic,
                        status: res.payload.status,
                        reply: res.payload.reply != null ? res.payload.reply : '',
                        ticket: res.payload,
                        loading: false,
                    })
                }
            })
    }

    topicChange = (e) => this.setState({ topic: e.target.value })
    statusChange = (e) => this.setState({ status: e.target.value })
    messageChange = (e) => this.setState({ message: e.target.value })
    replyChange = (e) => this.setState({ reply: e.target.value })

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { ticketId } = this.props.match.params
        const { topic, status, reply } = this.state
        const { token } = this.props

        if(!topic || !status || !reply) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR'})
            return
        }

        updateSupportTicket({ ticketId, topic, status, reply, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        topic: '',
                        status: '',
                        reply: '',
                        serverMsg: res.message,
                        serverStatus: 'OK'
                    })
                } else {
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ serverMsg: res.message, serverStatus: 'ERROR' })
                    return
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realizar la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realizar la acción', serverStatus: 'ERROR' })
                return
            })
    }

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
                            <li className="breadcrumb-item"><a href="#">Ticket</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{this.state.ticket.id}</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Detalles del Ticket</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label >Nombre del usuario</label>
                                                <input readOnly value={this.state.name} type="text" className="form-control" autoComplete="off" placeholder="Nombre" />
                                            </div>
                                            <div className="form-group">
                                                <label >Email del usuario</label>
                                                <input readOnly value={this.state.email} type="email" className="form-control" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <label >Título</label>
                                                <input readOnly value={this.state.title} type="text" className="form-control" autoComplete="off" placeholder="Título" />
                                            </div>
                                            <div className="form-group">
                                                <label>Mensaje</label>
                                                <input readOnly value={this.state.message} type="text" className="form-control" autoComplete="off" placeholder="Mensaje" />
                                            </div>
                                            <div className="form-group">
                                                <label>Cambiar Departamento</label>
                                                <select value={this.state.topic} onChange={this.topicChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    <option value="CUSTOMER_SERVICE" >Servicio al Cliente</option>
                                                    <option value="DRIVERS" >Conductores</option>
                                                    <option value="PAYMENTS">Finanzas y Pagos</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Estado</label>
                                                <select value={this.state.status} onChange={this.statusChange} className="js-example-basic-single w-100 select2-hidden-accessible" aria-hidden="true">
                                                    <option value="" >Selecciona una opción</option>
                                                    <option value="ACTIVE" >Activo</option>
                                                    <option value="COMPLETED" >Completado</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Respuesta</label>
                                                <textarea value={this.state.reply} onChange={this.replyChange} className="form-control" rows="5"></textarea>
                                            </div>


                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Responder</button>
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
export default connect(mapStateToProps)(SupportTicketDetails)
