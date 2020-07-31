import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Loading from '../Loading'
import ExternalTemplate from './ExternalTemplate'
import { toast } from 'react-toastify'

class Signup extends Component {

    state = {
        name: '',
        lastName: '',
        motherLastName: '',
        email: '',
        password: '',
        rpassword: '',
        terms: false,
        serverMsg: '',
        serverStatus: ''
    }

    componentDidMount() {
        document.title = "Registro"

    }

    nameChange = (e) => this.setState({ name: e.target.value })
    lastNameChange = (e) => this.setState({ lastName: e.target.value })
    motherLastNameChange = (e) => this.setState({ motherLastName: e.target.value })
    emailChange = (e) => this.setState({ email: e.target.value })
    passwordChange = (e) => this.setState({ password: e.target.value })
    rpasswordChange = (e) => this.setState({ rpassword: e.target.value })

    handleSubmit = (e) => {
        e.preventDefault()

        const { name, lastName, motherLastName, email, password, rpassword, terms } = this.state

        if (!name) {
            toast.error('Ingresa un Nombre válido', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

        if (!lastName) {
            toast.error('Ingresa un Apellido Paterno válido', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

        if (!motherLastName) {
            toast.error('Ingresa un Apellido Materno válido', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

        if (!email) {
            toast.error('Ingresa un Correo Electrónico válido', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

        if (!password) {
            toast.error('Ingresa una Contraseña válida', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

        if (!rpassword) {
            toast.error('Ingresa un la Confirmación de tu Contraseña válido', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

        if (!terms) {
            toast.error('Debes aceptar los Términos y Condiciones para continuar', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, })
            return
        }

    }

    render() {

        return (
            <ExternalTemplate>
                <section id="content">
                    <div className="content-wrap" style={{ paddingTop: '60px' }}>
                        <div className="container clearfix">
                            <div className="accordion accordion-lg mx-auto mb-0 clearfix" style={{ maxWidth: '550px' }}>
                                <div className="accordion-header accordion-active">
                                    <div className="page-title fadeIn animated">
                                        Empieza a invertir en Crowdfunding
                                    </div>
                                    <div className="light-text fadeIn animated">
                                        Regístrate, es fácil, rápido y sólo te toma un minuto.
                                    </div>
                                </div>
                                <div className="accordion-content clearfix" style={{ marginTop: '20px' }}>
                                    <form className="row mb-0 fadeIn animated" >
                                        <div className="col-12 form-group">
                                            <label>Nombre</label>
                                            <input name={this.state.name} onChange={this.nameChange} type="text" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Apellido Paterno</label>
                                            <input name={this.state.lastName} onChange={this.lastNameChange} type="text" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Apellido Materno</label>
                                            <input name={this.state.motherLastName} onChange={this.motherLastNameChange} type="text" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Corre Electrónico</label>
                                            <input name={this.state.email} onChange={this.emailChange} type="text" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Contraseña</label>
                                            <input name={this.state.password} onChange={this.passwordChange} type="password" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Repetir Contraseña</label>
                                            <input name={this.state.rpassword} onChange={this.rpasswordChange} type="password" className="form-control" />
                                        </div>
                                        <div className="col-12 form-group" style={{ marginBottom: '0px' }}>
                                            <div style={{ display: 'flex' }}>
                                                <input checked={this.state.terms} onChange={() => this.setState({ terms: !this.state.terms })} type="checkbox" className="form-control" style={{ height: '1rem', width: '10%', marginTop: '10px' }} />
                                                <p className="terms-text">Estoy de acuerdo con los <span className="primary">Términos y condiciones</span> y con el tratamiento de mis datos según el <span className="primary">Aviso de Privacidad</span></p>
                                            </div>
                                        </div>
                                        <div className="col-12 form-group" /*style={{textAlign:'center'}}*/>
                                            <button onClick={this.handleSubmit} className="btn btn-primary m-0 fadeIn animated">Registrarme</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="accordion-header">

                                    <div className="light-text" style={{ fontSize: '16px' }}>¿Ya tienes cuenta? Inicia sesión</div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </ExternalTemplate>
        )
    }

}

export default Signup