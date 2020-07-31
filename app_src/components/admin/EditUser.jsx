import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { getUserDetails, updateUserDetails, changeUserPassword } from '../../utils/api'

class EditUser extends Component {

    state = {
        userId: '',
        name: '',
        email: '',
        phone: '',
        pictureData: '',
        pictureId: '',
        serverMsg: '',
        serverStatus: '',
        password: '',
        rpassword: '',
        serverMsg2: '',
        serverStatus2: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Usuario"
        const { token } = this.props
        const { userId } = this.props.match.params

        getUserDetails({ userId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({
                        userId,
                        name: res.payload.name,
                        email: res.payload.email,
                        phone: res.payload.phone,
                        pictureId: res.payload.pictureId,
                        loading: false
                    })
                }
            })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { userId, name, email, phone, pictureData } = this.state
        const { token } = this.props

        if (!name || !email || !phone) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateUserDetails({ userId, name, email, phone, pictureData, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({
                        name: '',
                        email: '',
                        phone: '',
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

    handleChangePasswordBtn = (e) => {
        e.preventDefault()
        const { userId, password, rpassword } = this.state
        const { token } = this.props

        if (!userId || !password || !rpassword) {
            this.setState({ serverMsg2: 'Ingresa todos los campos requeridos', serverStatus2: 'ERROR' })
            return
        }

        if (password !== rpassword) {
            this.setState({ serverMsg2: 'Las contraseñas ingresadas no coinciden', serverStatus2: 'ERROR' })
            return
        }

        changeUserPassword({ userId, password, rpassword, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({
                        password: '',
                        rpassword: '',
                        serverMsg2: res.message,
                        serverStatus2: 'OK'
                    })
                } else {
                    this.setState({
                        serverMsg2: res.message,
                        serverStatus2: 'ERROR'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    serverMsg2: 'Ocurrió un error al intentar realizar la acción',
                    serverStatus2: 'ERROR'
                })
            })
    }

    handleCancelPasswordChangeBtn = (e) => {
        e.preventDefault()
        this.setState({
            password: '',
            rpassword: ''
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
        const { serverMsg, serverStatus, serverMsg2, serverStatus2, loading } = this.state

        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="page-content">
                    <nav className="page-breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={`/admin/users`}>Usuarios</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Editar Usuario</h6>
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
                                                <input value={this.state.phone} onChange={this.phoneChange} type="text" className="form-control" autoComplete="off" placeholder="Teléfono celular" />
                                            </div>

                                            <div className="form-group">
                                                <label>Imagen</label>
                                                <img style={{ height: '100px', display: 'block', marginBottom: '10px' }} src={`${process.env.API_HOST}/picture/${this.state.pictureId}`} />
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>


                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Usuario</button>
                                            <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 col-sm-12 grin-margin ">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Cambiar Contraseña</h6>
                                    <form className="forms-sample">
                                        {
                                            serverMsg2
                                            &&
                                            <div className={serverStatus2 === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                {serverMsg2}
                                            </div>
                                        }
                                        <div className="form-group">
                                            <label>Contraseña</label>
                                            <input value={this.state.password} onChange={this.passwordChange} type="password" className="form-control" autoComplete="off" placeholder="Contraseña" />
                                        </div>
                                        <div className="form-group">
                                            <label>Repetir Contraseña</label>
                                            <input value={this.state.rpassword} onChange={this.rpasswordChange} type="password" className="form-control" autoComplete="off" placeholder="Repetir Contraseña" />
                                        </div>
                                        <button onClick={this.handleChangePasswordBtn}  className="btn btn-primary mr-2">Actualizar Contraseña</button>
                                        <button onClick={this.handleCancelPasswordChangeBtn} className="btn btn-light">Cancelar</button>
                                    </form>
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
