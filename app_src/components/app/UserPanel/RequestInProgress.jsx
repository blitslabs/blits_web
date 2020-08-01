import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'


class RequestInProgress extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Carga de Documentos - SwayLending"

        this.setState({
            loading: false
        })
    }

    render() {

        const { loading } = this.state


        if (loading) {
            return <Loading />
        }

        return (
            <DashboardTemplate>
                <div className="row p-4" style={{ minHeight: '820px' }}>
                    <div className="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 " >

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="page-title mt-3 pt-3">Solicitud en Proceso</div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-sm-12 col-md-6 offset-md-3 ">
                                <div className="form-label mt-4" style={{ fontSize: '20px' }}>Estamo trabajando en tu solicitud, te enviaremos una notificación cuando tengamos la resolución.</div>
                                <div className="text-center">
                                    <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '400px', marginTop: '-40px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardTemplate>
        )
    }
}

function mapStateToProps({ auth, formController, creditRequest }) {
    return {
        token: auth && auth.token,
        creditRequest,
        formController: 'formController' in formController ? formController.formController : 1,
    }
}

export default connect(mapStateToProps)(RequestInProgress)
