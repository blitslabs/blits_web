import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { createUser } from '../../utils/api'

class AddSupportAgent extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        rpassword: '',
        pictureData: '',
        serverMsg: '',
        serverStatus: '',
        loading: false
    }

    componentDidMount() {
        document.title = "Añadir Agente de Soporte"
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { name, email, phone, password, rpassword, pictureData } = this.state
        const { token } = this.props

        if (!name || !email || !phone || !password || !rpassword) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        if (password !== rpassword) {
            toast.error('Las contraseñas ingresadas no coinciden', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Las contraseñas ingresadas no coinciden', serverStatus: 'ERROR' })
            return
        }

        createUser({ name, email, phone, password, rpassword, accountType: 'SUPPORT', pictureData, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        rpassword: '',
                        pictureData: '',
                        serverMsg: res.message,
                        serverStatus: 'OK',
                    })
                } else {
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ serverMsg: res.message, serverStatus: 'ERROR' })
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realizar la acción', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realizar la acción', serverStatus: 'ERROR' })
            })
    }

    nameChange = (e) => this.setState({ name: e.target.value })
    emailChange = (e) => this.setState({ email: e.target.value })
    phoneChange = (e) => this.setState({ phone: e.target.value })
    pictureDataChange = (data) => this.setState({ pictureData: data })
    passwordChange = (e) => this.setState({ password: e.target.value })
    rpasswordChange = (e) => this.setState({ rpassword: e.target.value })

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
                            <li className="breadcrumb-item"><a href="#">Soporte</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Añadir</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Añadir Agente de Soporte</h6>
                                        <form className="forms-sample">
                                            {
                                                serverMsg
                                                &&
                                                <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                    {serverMsg}
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label >Nombre</label>
                                                <input value={this.state.name} onChange={this.nameChange} type="text" className="form-control" autoComplete="off" placeholder="Nombre" />
                                            </div>
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input value={this.state.email} onChange={this.emailChange} type="email" className="form-control" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <label >Teléfono celular</label>
                                                <input value={this.state.phone} onChange={this.phoneChange} type="number" className="form-control" autoComplete="off" placeholder="Teléfono celular" />
                                            </div>
                                            <div className="form-group">
                                                <label>Contraseña</label>
                                                <input value={this.state.password} onChange={this.passwordChange} type="password" className="form-control" autoComplete="off" placeholder="Contraseña" />
                                            </div>
                                            <div className="form-group">
                                                <label>Repetir Contraseña</label>
                                                <input value={this.state.rpassword} onChange={this.rpasswordChange} type="password" className="form-control" autoComplete="off" placeholder="Repetir Contraseña" />
                                            </div>

                                            <div className="form-group">
                                                <label>Imagen</label>                                                
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>


                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Añadir Agente</button>
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
export default connect(mapStateToProps)(AddSupportAgent)
