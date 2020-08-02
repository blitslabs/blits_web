import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Login from './Login'
import Signup from './Signup'
import Precalificador from './UserPanel/Precalificador'
import AvailableCreditOptions from './UserPanel/AvailableCreditOptions'
import UploadDocuments from './UserPanel/UploadDocuments'
import RequestInProgress from './UserPanel/RequestInProgress'
import CreditProposals from './UserPanel/CreditProposals'
import CreditRequest from './UserPanel/CreditRequest'
import CreditRequestInProgress from './UserPanel/CreditRequestInProgress'
import CreditAuthorization from './UserPanel/CreditAuthorization'
import Appraisal from './UserPanel/Appraisal'
import NotarySignature from './UserPanel/NotarySignature'
import PartnerRouter from './PartnerPanel/PartnerRouter'

class AppRouter extends Component {
    render() {
        const { match, auth } = this.props
        return (
            <Fragment>
                <Route path={match.path} exact component={Login} />
                <Route path={`${match.path}/login`} component={Login} />
                <Route path={`${match.path}/signup`} component={Signup} />
                <Route path={`${match.path}/precalificador`} component={Precalificador} />
                <Route path={`${match.path}/opciones-disponibles`} component={AvailableCreditOptions} />
                <Route path={`${match.path}/cargar-documentos`} component={UploadDocuments} />
                <Route path={`${match.path}/solicitud-en-proceso`} component={RequestInProgress} />
                <Route path={`${match.path}/propuestas-de-credito`} component={CreditProposals} />
                <Route path={`${match.path}/solicitud-credito`} component={CreditRequest} />
                <Route path={`${match.path}/solicitud-credito-en-proceso`} component={CreditRequestInProgress} />
                <Route path={`${match.path}/autorizacion`} component={CreditAuthorization} />
                <Route path={`${match.path}/avaluo`} component={Appraisal} />
                <Route path={`${match.path}/firma-notaria`} component={NotarySignature} />

                <Route path={`${match.path}/partner`} component={PartnerRouter} />
            </Fragment>
        )
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    const { auth } = rest
    return (
        <Route
            {...rest}
            render={props =>
                auth !== null ? (
                    <Component {...props} />
                )
                    : (
                        <Redirect
                            to={{
                                pathname: '/admin/login',
                                state: { from: props.location.pathname }
                            }}
                        />
                    )
            }
        />
    )
}

function mapStateToProps({ auth }) {
    return {

        auth
    }
}

export default connect(mapStateToProps)(AppRouter)



