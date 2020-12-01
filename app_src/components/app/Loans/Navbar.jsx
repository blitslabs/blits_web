import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import { getPrices } from '../../../utils/api'

// Actions
import { savePrices } from '../../../actions/prices'

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
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()

        if (!window.ethereum || accounts.length === 0) {
            this.setState({ ethereum: false })
        }

        if (!window.onewallet) {
            this.setState({ onewallet: false })
        }
    }

    handleToggleConnectModal = async (value) => this.setState({ showConnectModal: value })

    render() {

        const { ethereum, showConnectModal } = this.state

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
                                        <a className="nav-link scroll" href="/app/borrow">Borrow</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link scroll" href="/app/lend">Lend</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link scroll" href="#">History</a>
                                    </li>
                                    {
                                        !ethereum && (
                                            <li className="nav-item">
                                                <button onClick={(e) => { e.preventDefault(); this.handleToggleConnectModal(true) }} className="btn btn-blits connect-btn" style={{ fontSize: '14px', background: 'linear-gradient(-47deg, #8731E8 0%, #4528DC 100%)' }}>
                                                    <Emoji text="🔓" onlyEmojiClassName="sm-emoji" />
                                                    Connect
                                                </button>
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

function mapStateToProps({ preCreditRequest, preFormController }) {
    return {

    }
}

export default connect(mapStateToProps)(Navbar)