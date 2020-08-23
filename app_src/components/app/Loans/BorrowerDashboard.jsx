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
import { getLoansByStatus, getAccountLoans, getContractsData, updateLoanState } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import moment from 'moment'

class LenderDashboard extends Component {
    state = {
        loans: '',
        myLoans: '',
        contracts: ''
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

        getAccountLoans({ account, userType: 'BORROWER', loanState: 'ALL' })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    this.setState({ myLoans: res.payload })
                }
            })

        getLoansByStatus({ status: 'FUNDED ' })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ loans: res.payload })
                }
            })

        getContractsData()
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    this.setState({ contracts: res.payload })
                }
            })
    }

    handleConfirmBorrow = async (loanId) => {
        const { history } = this.props
        history.push(`/app/borrow/confirm/${loanId}`)
    }


    render() {

        const { loanRequest } = this.props
        const { requestType } = loanRequest

        return (
            <Fragment>
                <div className="main">
                    <Navbar />
                    <section className="section app-section" style={{ marginTop: '10rem' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="mb-4 text-left">

                                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'black' }}>Borrow Dashboard</div>

                                    </div>
                                    <h3>My Loans</h3>

                                    {
                                        this.state.myLoans && this.state.myLoans.length > 0
                                            ?
                                            <div className="row mt-5 ">
                                                {
                                                    this.state.myLoans.map((l) => (
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
                                                                <div className="label-value active-loan-details">{l.bCoinState === 'OPEN' ? 'NOT FUNDED' : l.bCoinState === 'FUNDED' ? 'WAITING FOR BORROWER' : l.bCoinState}</div>

                                                                {
                                                                    l.bCoinState === 'OPEN'
                                                                        ? <button onClick={() => this.handleDepositPrincipal(l.bCoinLoanId, l.assetSymbol, l.principal)} className="btn btn-blits mt-4">Deposit Principal</button>
                                                                        : ''
                                                                }


                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            : <div className="text-center">You do not have loans</div>
                                    }

                                    <hr className="mt-5 mb-5" />

                                    <h3 className="mt-5">Available Loans</h3>

                                    {

                                        this.state.loans && this.state.loans.length > 0
                                            ?
                                            <div className="row mt-5 ">
                                                {
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
                                                                <button onClick={() => this.handleConfirmBorrow(l.id)} className="btn btn-blits mt-4">Borrow</button>


                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            : <div className="text-center">No available loans found</div>
                                    }


                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Fragment >
        )
    }
}


function mapStateToProps({ loanRequest }) {
    return {
        loanRequest,
    }
}

export default connect(mapStateToProps)(LenderDashboard)