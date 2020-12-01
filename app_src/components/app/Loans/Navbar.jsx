import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import { getPrices } from '../../../utils/api'

// Actions
import { savePrices } from '../../../actions/prices'
import { setProviderStatus } from '../../../actions/shared'

// Libraries
import Emoji from "react-emoji-render"
import Web3 from 'web3'

// Components
import ConnectModal from './ConnectModal'

class Navbar extends Component {

    state = {
        ethereum: false,
        onewallet: false,
        showConnectModal: false
    }

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

        this.loandInitialData()
    }

    loandInitialData = async () => {
        const { dispatch } = this.props
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()

        if (window.ethereum && accounts.length > 0) {
            dispatch(setProviderStatus({ name: 'ethereum', status: true }))
        } else {
            dispatch(setProviderStatus({ name: 'ethereum', status: false }))
        }

        if (window.onewallet) {
            dispatch(setProviderStatus({ name: 'harmony', status: true }))
        } else {
            dispatch(setProviderStatus({ name: 'harmony', status: false }))
        }
    }

    handleToggleConnectModal = async (value) => this.setState({ showConnectModal: value })

    render() {

        const { showConnectModal } = this.state
        const { shared } = this.props
        const { ethereum } = shared

        return (
            <Fragment>
                <ToastContainer />

                <header className="navbar navbar-sticky navbar-expand-lg navbar-dark" >
                    <div className="container position-relative">
                        <a className="navbar-brand" href="/app/loans">
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
                                        <Link className="nav-link scroll" to="/app/borrow">Borrow</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link scroll" to="/app/lend">Lend</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link scroll" href="#">History</Link>
                                    </li>
                                    {
                                        !ethereum || ethereum.status === false ? (
                                            <li className="nav-item">
                                                <button onClick={(e) => { e.preventDefault(); this.handleToggleConnectModal(true) }} className="btn btn-blits connect-btn" style={{ fontSize: '14px', background: 'linear-gradient(-47deg, #8731E8 0%, #4528DC 100%)' }}>
                                                    <Emoji text="🔓" onlyEmojiClassName="sm-emoji" />
                                                    Connect
                                                </button>
                                            </li>
                                        ) : (
                                                <li className="nav-item">
                                                    <a className="nav-link scroll" href="#">My Loans</a>
                                                </li>
                                            )
                                    }

                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>

                <ConnectModal isOpen={showConnectModal} toggleModal={this.handleToggleConnectModal} />
            </Fragment>

        )
    }
}

function mapStateToProps({ shared }) {
    return {
        shared
    }
}

export default connect(mapStateToProps)(Navbar)