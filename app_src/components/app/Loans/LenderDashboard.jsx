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
import { getContractABI, getAccountLoans, getContractsData, updateLoanState } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import moment from 'moment'
import ReactLoading from 'react-loading'

class LenderDashboard extends Component {
    state = {
        loans: '',
        contracts: '',
        loading: false
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

        getAccountLoans({ account, userType: 'LENDER', loanState: 'ALL' })
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (res.status === 'OK') {
                    console.log(res.payload)
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

    handleDepositPrincipal = async (loanId, assetSymbol, principal) => {
        console.log('DEPOSIT_PRINCIPAL_BTN')
        console.log(loanId)
        const { contracts } = this.state

        this.setState({ loading: true })

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]

        // check allowance
        const stablecoin = await new web3.eth.Contract(contracts[assetSymbol].abi.abi, contracts[assetSymbol].contractAddress)

        let allowance = await stablecoin.methods.allowance(from, contracts.bCoin.contractAddress).call()
        allowance = web3.utils.fromWei(allowance)
        console.log('Allowance:', allowance)

        if (!allowance || allowance < principal) {
            await stablecoin.methods.approve(contracts.bCoin.contractAddress, web3.utils.toWei(principal)).send({ from })
            this.setState({ loading: false })
            return
        }

        const blitsLoans = await new web3.eth.Contract(contracts.bCoin.abi.abi, contracts.bCoin.contractAddress)

        // fund loan
        const tx = await blitsLoans.methods.fund(loanId).send({ from })
        console.log(tx)

        if ('blockHash' in tx) {
            updateLoanState({ loanId: loanId, coin: 'BCOIN', loanState: 'FUNDED' })
                .then(data => data.json())
                .then((res) => {
                    this.setState({ loading: false })
                    // quick fix
                    window.location.reload()
                })
        }
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
                                                            <div className="label-value active-loan-details">{l.bCoinState === 'OPEN' ? 'NOT FUNDED' : l.bCoinState === 'FUNDED' ? 'WAITING FOR BORROWER' : l.bCoinState}</div>

                                                            {

                                                                l.bCoinState === 'OPEN'
                                                                    ?
                                                                    this.state.loading
                                                                        ?
                                                                        <div style={{ marginTop: '15px', }}>
                                                                            <div style={{ color: '#32CCDD', fontWeight: 'bold', textAlign: 'justify' }}>Waiting for TX to confirm. Please be patient, Ethereum can be slow sometimes :)</div>
                                                                            <ReactLoading type={'cubes'} color="#32CCDD" height={40} width={60} />
                                                                        </div>
                                                                        : <button onClick={() => this.handleDepositPrincipal(l.bCoinLoanId, l.assetSymbol, l.principal)} className="btn btn-blits mt-4">Deposit Principal</button>

                                                                    : ''

                                                            }


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