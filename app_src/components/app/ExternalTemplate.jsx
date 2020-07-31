import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components

import ExternalNavbar from './ExternalNavbar'
import ExternalFooter from './ExternalFooter'
import PageTitle from './PageTitle'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css'


class ExternalTemplate extends Component {
    
    
    render() {
        return (
            <Fragment>
               
                <div className="main-wrapper">
                    <ExternalNavbar />
                    
                    <ToastContainer />
                    {this.props.children}
                    <ExternalFooter/>
                </div>
            </Fragment>
        )
    }
}


export default ExternalTemplate