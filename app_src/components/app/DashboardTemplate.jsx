import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class DashboardTemplate extends Component {


    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <ToastContainer />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}


export default DashboardTemplate