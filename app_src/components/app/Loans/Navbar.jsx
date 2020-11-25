import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import { getPrices } from '../../../utils/api'

// Actions
import { savePrices } from '../../../actions/prices'

class Navbar extends Component {

    componentDidMount() {
        const { dispatch } = this.props

        getPrices()
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    dispatch(savePrices(res.payload))
                }
            })
    }

    render() {
        return (
            <Fragment>
                <ToastContainer />

                <header className="navbar navbar-sticky navbar-expand-lg navbar-dark" >
                    <div className="container position-relative">
                        <a className="navbar-brand" href="index.html">
                            <img
                                className="navbar-brand-regular"
                                src={process.env.SERVER_HOST + "/assets/images/logo.png"}
                                alt="brand-logo"
                            />
                            <img
                                className="navbar-brand-sticky"
                                src={process.env.SERVER_HOST + "/assets/images/logo.png"}
                                alt="sticky brand-logo"
                            />
                        </a>
                        <button
                            className="navbar-toggler d-lg-none"
                            type="button"
                            data-toggle="navbarToggler"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="navbar-inner">
                            {/*  Mobile Menu Toggler */}
                            <button
                                className="navbar-toggler d-lg-none"
                                type="button"
                                data-toggle="navbarToggler"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <nav>
                                <ul className="navbar-nav" id="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link scroll" href="/app/borrow">Borrow</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link scroll" href="/app/lend">Lend</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link scroll" href="#">History</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link scroll" href="#">Blog</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header >
            </Fragment>

        )
    }
}

function mapStateToProps({ preCreditRequest, preFormController }) {
    return {

    }
}

export default connect(mapStateToProps)(Navbar)