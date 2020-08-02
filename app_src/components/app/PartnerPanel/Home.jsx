import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'
import DropZone from '../DropZone'

class Home extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Home | Parthner - SwayLending"

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

                        <div style={{ display: 'flex' }}>
                            <div className="page-title mt-3 pt-3">Home</div>
                            <img src={process.env.SERVER_HOST + '/app_assets/images/telescopio.png'} style={{ height: '100px' }} />
                        </div>

                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <div className="text-right">
                                    <button className="btn btn-green">Nueva Pre-calificación</button>
                                </div>
                                <div className="mt-4">
                                    <table className="table table-responsive table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Score</th>
                                                <th>Status</th>
                                                <th>Subproceso</th>
                                                <th>Monto Máximo de Crédito</th>
                                                <th>Probabilidad de ser autorizado</th>
                                                <th>Siguiente acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Manuel Alberto Sanchez Hernandez</td>
                                                <td>745</td>
                                                <td>Pre-autorizado</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>Autorizar</td>
                                            </tr>
                                            <tr>
                                                <td>Manuel Alberto Sanchez Hernandez</td>
                                                <td>745</td>
                                                <td>Pre-autorizado</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>Autorizar</td>
                                            </tr>
                                            <tr>
                                                <td>Manuel Alberto Sanchez Hernandez</td>
                                                <td>745</td>
                                                <td>Pre-autorizado</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>Autorizar</td>
                                            </tr>
                                        </tbody>
                                    </table>
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

export default connect(mapStateToProps)(Home)
