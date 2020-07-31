import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// components
import Loading from './Loading'

import withAuth from './withAuth'
import withAdminAuth from './withAdminAuth'

// App Router
import AppRouter from './app/AppRouter'

// Admin Router
import Admin from './admin/Admin'

class App extends Component {

  componentDidMount() {
    //this.props.dispatch(handleInitialData())
  }

  render() {
    
    const { loading, match } = this.props
    console.log(this.props)
    return (
      <Router>
        <Fragment>
          {
            loading === true
            ? <Loading />
            :
            <Fragment>       
              { }       
              <Route path='/app' component={AppRouter} />
              <Route path='/admin' component={Admin} />
            </Fragment>
          }
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps({  loading }) {
  return {    
    loading
  }
}

export default connect(mapStateToProps)(App)