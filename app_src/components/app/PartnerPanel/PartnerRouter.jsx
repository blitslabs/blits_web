
import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home'
import ClientRecords from './ClientRecords'
import Precalificador from './Precalificador'

class PartnerRouter extends Component {
    render() {
        const { match, auth } = this.props
       
        return (
            <Fragment>
                <Route path={`${match.path}/home`} component={Home} />
                <Route path={`${match.path}/expedientes`} component={ClientRecords} />
                <Route path={`${match.path}/precalificador`} component={Precalificador} />
            </Fragment>
        )
    }
}

function mapStateToProps({ auth }) {
    return {
        auth,
    }
}

export default connect(mapStateToProps)(PartnerRouter)