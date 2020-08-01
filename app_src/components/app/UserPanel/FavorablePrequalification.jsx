import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components

// Actions
import { saveCreditRequest } from '../../../actions/creditRequest'
import { nextFormController, backFormController } from '../../../actions/formController'

class FavorablePrequalification extends Component {

    state = {
    }

    componentDidMount() {
        const { creditRequest, dispatch } = this.props
        document.title = "Precalificación Favorable | Precalificador - SwayLending"
    }
   
    handleContinueBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(nextFormController())
    }

    handleBackBtn = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(backFormController())
    }

    render() {
        const { creditRequest } = this.props

        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3 text-center">
                    <div className="form-title" style={{ fontSize: '36px' }}>Tu precalificación es favorable</div>
                    <div className="form-group mt-4">
                        <img style={{ height: '200px' }} src={process.env.SERVER_HOST + '/app_assets/images/check_icon.jpg'} alt="" />
                    </div>
                    <div className="form-group">
                        <div className="download-label">Descargar historial crediticio</div>
                        <div className="form-input-desc text-center">También te hemos enviado tu historial a tu correo <span>{creditRequest.email}</span></div>
                    </div>
                    <div className="form-group text-center mt-5" >

                        <button onClick={this.handleContinueBtn} className="btn btn-green">Siguiente {'>'}</button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps)(FavorablePrequalification)
