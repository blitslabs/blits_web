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
import { saveAccount } from '../../../actions/accounts'

// Libraries
import Emoji from "react-emoji-render"
import Web3 from 'web3'
import ONE from '../../../crypto/ONE'

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

        let web3, accounts
        try {
            web3 = new Web3(window.ethereum)
            accounts = await web3.eth.getAccounts()
        } catch (e) {
            console.log(e)
        }

        if (window.ethereum && accounts.length > 0) {
            dispatch(setProviderStatus({ name: 'ethereum', status: true }))
            dispatch(saveAccount({ blockchain: 'ETH', account: accounts[0] }))
        } else {
            dispatch(setProviderStatus({ name: 'ethereum', status: false }))
            dispatch(saveAccount({ blockchain: 'ETH', account: '' }))
        }

        let harmonyAccount
        try {
            const res = await ONE.getAccount()            
            if (res.status === 'OK') {
                harmonyAccount = res.payload
            }
        } catch (e) {
            console.log(e)
        }

        if (harmonyAccount) {
            dispatch(setProviderStatus({ name: 'harmony', status: true }))
            dispatch(saveAccount({ blockchain: 'ONE', account: harmonyAccount.address }))
        } else {
            dispatch(setProviderStatus({ name: 'harmony', status: false }))
        }
    }

    handleToggleConnectModal = async (value) => this.setState({ showConnectModal: value })

    render() {

        const { showConnectModal } = this.state
        const { shared, accounts } = this.props
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
                                        <Link className="nav-link scroll" to="/app/history">History</Link>
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
                                                    <Link className="nav-link scroll" to={"/app/myloans/"}>My Loans</Link>
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

function mapStateToProps({ shared, accounts }) {
    return {
        shared,
        accounts
    }
}

export default connect(mapStateToProps)(Navbar)