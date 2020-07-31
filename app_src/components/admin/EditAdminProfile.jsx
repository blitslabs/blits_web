import React, { Component, Fragment, useCallback } from 'react'
import { connect } from 'react-redux'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { updateUserDetails, getAdminData } from '../../utils/api'

// Actions
import { saveUserData  } from '../../actions/user'

class EditAdminProfile extends Component {

    state = {
        name: '',
        email: '',
        pictureId: '',
        pictureData: '',
        loading: true
    }

    componentDidMount() {
        document.title = "Editar Perfil de Administrador"
        const { user } = this.props
        this.setState({
            name: user.name,
            email: user.email,
            pictureId: user.pictureId,
            loading: false
        })
    }

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { name, email, pictureData } = this.state
        const { user, token, dispatch } = this.props

        if (!name || !email) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateUserDetails({ userId: user.id, name, email, phone: user.phone, pictureData, token })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    getAdminData({ token })
                        .then(data => data.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                dispatch(saveUserData(res2.payload))
                                toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                                this.setState({
                                    name: '',
                                    email: '',
                                    pictureData: '',
                                    serverMsg: res.message,
                                    serverStatus: 'OK',
                                })
                            }
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
    pictureDataChange = (data) => this.setState({ pictureData: data })


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
                            <li className="breadcrumb-item"><a href="#">Perfil</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Actualizar</li>
                        </ol>
                    </nav>

                    <div className="row mt-4">
                        <div className="col-md-6 col-xs-12 col-sm-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-body">
                                        <h6 className="card-title">Actualizar Perfil</h6>
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
                                                <label>Imagen</label>
                                                <img style={{ height: '100px', display: 'block', marginBottom: '10px' }} src={`${process.env.API_HOST}/picture/${this.state.pictureId}`} />
                                                <DropZone saveFileData={this.pictureDataChange} multiple={false} />
                                            </div>
                                            <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Perfil</button>
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


function mapStateToProps({ auth, user }) {
    return {
        token: auth && auth.token,
        user
    }
}
export default connect(mapStateToProps)(EditAdminProfile)
