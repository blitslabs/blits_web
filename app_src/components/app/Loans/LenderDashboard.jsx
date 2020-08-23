import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Footer from './Footer'

// Styles
import '../styles.css'

// Actions
import { saveLoanRequestAsset } from '../../../actions/loanRequest'

// API
import { getAccountLoans } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import moment from 'moment'

class LenderDashboard extends Component {
    state = {
        loans: ''
    }

    async componentDidMount() {
        const { loanRequest, history } = this.props
        const { requestType } = loanRequest

        if (!window.ethereum) {
            console.log('error no ethereum')
        }

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()

        const accounts = await web3.eth.getAccounts()
        const account = accounts[0]

        getAccountLoans({ account, userType: 'LENDER', loanState: 'OPEN' })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ loans: res.payload })
                }
            })


    }

    handleOptionClick = (option) => {
        const { loanRequest, dispatch, history } = this.props
        dispatch(saveLoanRequestAsset(option))
        const r = loanRequest.requestType === 'borrow' ? '/app/borrow/new' : '/app/lend/new'
        history.push(r)
    }

    render() {

        const { loanRequest } = this.props
        const { requestType } = loanRequest

        return (
            <Fragment>
                <div className="main">
                    <Navbar />
                    <section className="section app-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="mb-4 text-left">
                                        <h3>Lend Dashboard</h3>
                                        <h1>Your Active Loans</h1>
                                    </div>
                                    <div className="row mt-5 ">
                                        {
                                            this.state.loans
                                                ?
                                                this.state.loans.map((l) => (
                                                    <div key={l.id} className="col-sm-12 col-md-4 mb-2 text-center">
                                                        <div className="app-card shadow-lg text-left">
                                                            <div className="text-center"><img src={l.assetSymbol === 'DAI' ? (process.env.SERVER_HOST + '/assets/images/dai_logo.png') : (process.env.SERVER_HOST + '/assets/images/busd_logo.png')} alt="" /></div>

                                                            <div className="label-title mt-5">Loan Principal</div>
                                                            <div className="label-value active-loan-details">{l.principal} {l.assetSymbol}</div>
                                                            <div className="label-title mt-3">Interest</div>
                                                            <div className="label-value active-loan-details">{parseFloat(l.interest).toFixed(4)} {l.assetSymbol}</div>
                                                            <div className="label-title mt-3">Approve Expiration</div>
                                                            <div className="label-value active-loan-details">{moment.unix(l.bCoinApproveExpiration).format('MM/DD/YY HH:mm')}</div>
                                                            <div className="label-title mt-3">Loan Expiration</div>
                                                            <div className="label-value active-loan-details">{moment.unix(l.bCoinLoanExpiration).format('MM/DD/YY HH:mm')}</div>
                                                            <div className="label-title mt-3">Accept Repayment Expiration</div>
                                                            <div className="label-value active-loan-details">{moment.unix(l.bCoinAcceptExpiration).format('MM/DD/YY HH:mm')}</div>
                                                            <div className="label-title mt-3">Status</div>
                                                            <div className="label-value active-loan-details">{l.bCoinState}</div>



                                                            <button className="btn btn-blits mt-4">{l.bCoinState === 'OPEN' ? 'Deposit Principal' : ''}</button>
                                                        </div>
                                                    </div>
                                                ))
                                                : null
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Fragment>
        )
    }
}


function mapStateToProps({ loanRequest }) {
    return {
        loanRequest,
    }
}

export default connect(mapStateToProps)(LenderDashboard)