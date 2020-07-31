import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles.css'


class DashboardTemplate extends Component {
    
    
    render() {
        return (
            <Fragment>
                <Sidebar />
                <div className="page-wrapper">
                    <Navbar />
                    <ToastContainer />
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}


export default DashboardTemplate