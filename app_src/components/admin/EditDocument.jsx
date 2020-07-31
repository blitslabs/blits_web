import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Components
import DashboardTemplate from './DashboardTemplate'
import Loading from '../Loading'
import DateTimePicker from 'react-datetime-picker';
import DropZone from './DropZone'
import { toast } from 'react-toastify'

// API
import { getDocumentDetails, updateDocument } from '../../utils/api'

// Libraries
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


class EditDocument extends Component {

    state = {
        expDate: '',
        pictureId: '',
        serverMsg: '',
        serverStatus: '',
        loading: true,
    }

    componentDidMount() {
        document.title = "Editar Documento"
        const { token } = this.props
        const { documentId } = this.props.match.params
        getDocumentDetails({ documentId, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res)
                    this.setState({ documentId, expDate: res.payload.expDate, pictureId: res.payload.pictureId, loading: false })
                }
            })
    }

    saveFileData = (pictureData) => this.setState({ pictureData })
    expDateChange = (expDate) => this.setState({ expDate })

    handleSubmitBtn = (e) => {
        e.preventDefault()
        const { documentId, expDate, pictureData } = this.state
        const { token } = this.props

        if (!documentId || !expDate || !pictureData) {
            toast.error('Ingresa todos los campos requeridos', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            this.setState({ serverMsg: 'Ingresa todos los campos requeridos', serverStatus: 'ERROR' })
            return
        }

        updateDocument({ documentId, expDate, pictureData, token })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    toast.success(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ expDate: '', pictureData: '', serverMsg: res.message, serverStatus: 'OK' })
                    return
                } else {
                    toast.error(res.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                    this.setState({ expDate: '', pictureData: '', serverMsg: res.message, serverStatus: 'ERROR' })
                    return
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Ocurrió un error al intentar realizar la operación', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
                this.setState({ serverMsg: 'Ocurrió un error al intentar realizar la operación', serverStatus: 'ERROR' })
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
                            <li className="breadcrumb-item"><a href="#">Documentos</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Editar</li>
                        </ol>
                    </nav>
                    <div className="row mt-4">
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Editar Documento</h6>
                                    <div className="row">
                                        <div className="col-md-6 col-xs-12 col-sm-12">
                                            <form className="forms-sample">
                                                {
                                                    serverMsg
                                                    &&
                                                    <div className={serverStatus === 'OK' ? "alert alert-success" : "alert alert-danger"} role="alert">
                                                        {serverMsg}
                                                    </div>
                                                }
                                                <div className="form-group">
                                                    <label>Fecha de Caducidad</label>
                                                    <div stlye={{ display: 'block' }}>
                                                        <DateTimePicker value={this.state.expDate} onChange={this.expDateChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Imagen</label>
                                                    <DropZone saveFileData={this.saveFileData} multiple={false} />
                                                </div>

                                                <button onClick={this.handleSubmitBtn} className="btn btn-primary mr-2">Actualizar Documento</button>
                                                <button onClick={this.handleGoBack} className="btn btn-light">Cancelar</button>
                                            </form>
                                        </div>
                                        <div className="col-md-6 col-xs-12 col-sm-12" >
                                            <div>
                                                <img style={{ height: '100%', display: 'block', marginBottom: '10px' }} src={`${process.env.API_HOST}/picture/${this.state.pictureId}`} />
                                            </div>
                                        </div>
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
export default connect(mapStateToProps)(EditDocument)