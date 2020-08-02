import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../Loading'
import CurrencyInput from 'react-currency-input'
import DashboardTemplate from '../DashboardTemplate'
import DropZone from '../DropZone'

class UploadCreditProposals extends Component {

    state = {

        loading: true
    }

    componentDidMount() {
        const { token, dispatch } = this.props

        document.title = "Propuestas - SwayLending"

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
            <Fragment>
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-6 col-lg-6 mb-4">

                        <div className="text-center">
                            <div>
                                <img className="pb-4" src={process.env.SERVER_HOST + '/app_assets/images/santander_logo.png'} alt="" />
                            </div>
                            <div className="form-label">Banco: <span style={{ color: '#212529' }}>Santander</span></div>
                            <div className="mt-3"><button onClick={this.handleContinueBtn} className="btn btn-blue" style={{ width: '300px' }}>Descargar solicitud</button></div>
                            <div className="mt-2"><button onClick={this.handleContinueBtn} className="btn btn-green" style={{ width: '300px' }}>Guía para firmar solicitud</button></div>
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 ">
                        <div className="text-center">
                            <div className="form-label mb-2">INE (FRONTAL)</div>
                            <DropZone saveFileData={this.pictureDataChange} multiple={false} />

                        </div>
                    </div>
                </div>

               

                <div className="row mt-5">
                    <div className="col-sm-12 col-md-6 col-lg-6 mb-4">

                        <div className="text-center">
                            <div>
                                <img className="pb-4" src={process.env.SERVER_HOST + '/app_assets/images/santander_logo.png'} alt="" />
                            </div>
                            <div className="form-label">Banco: <span style={{ color: '#212529' }}>Santander</span></div>
                            <div className="mt-3"><button onClick={this.handleContinueBtn} className="btn btn-blue" style={{ width: '300px' }}>Descargar solicitud</button></div>
                            <div className="mt-2"><button onClick={this.handleContinueBtn} className="btn btn-green" style={{ width: '300px' }}>Guía para firmar solicitud</button></div>
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 ">
                        <div className="text-center">
                            <div className="form-label mb-2">INE (FRONTAL)</div>
                            <DropZone saveFileData={this.pictureDataChange} multiple={false} />

                        </div>
                    </div>
                </div>
            </Fragment>
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

export default connect(mapStateToProps)(UploadCreditProposals)
