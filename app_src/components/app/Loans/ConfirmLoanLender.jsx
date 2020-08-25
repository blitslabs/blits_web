import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// Styles
import '../styles.css'

// Actions
import { saveSecretHashB1, saveLoanRequestTerms, } from '../../../actions/loanRequest'

// API
import { getAssets, saveLoan, getContractABI, saveExtLoanId, updateLoanState, getContractsData } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import { sha256 } from '@liquality-dev/crypto'
// const web3 = new Web3(process.env.WEB3_HTTP_PROVIDER)

class LoanTerms extends Component {
    state = {
        interestAmount: 0,
        repaymentAmount: 0,
        collateralAmount: 0,
        liquidationPrice: 0,
        assets: [],
        abi: '',
        signed: false,
        contracts: ''
    }

    componentDidMount() {
        const { loanRequest, history } = this.props

        document.title = 'Confirm Loan'
        if (!loanRequest.requestType) {
            history.push('/app/loans')
        }

        getContractsData()
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {          
                    console.log(res.payload)          
                    this.setState({ contracts: res.payload })
                }
            })

        getAssets()
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    const token = res.payload.filter(a => a.assetSymbol === loanRequest.asset)
                    const collateralAsset = res.payload.filter(a => a.assetSymbol === 'ONE')
                    const interestRate = (parseInt(loanRequest.duration) / 365) * parseFloat(loanRequest.apr) / 100
                    const interestAmount = interestRate * parseFloat(loanRequest.amount)
                    const repaymentAmount = interestAmount + parseFloat(loanRequest.amount)
                    const baseCollateral = parseFloat(loanRequest.amount) / parseFloat(collateralAsset[0].priceUSD)
                    const collateralAmount = (baseCollateral * parseFloat(loanRequest.collateralizationRatio) / 100).toFixed(2)
                    const liquidationPrice = collateralAsset[0].priceUSD - ((parseFloat(loanRequest.collateralizationRatio) - 100) / 100) * parseFloat(collateralAsset[0].priceUSD)

                    this.setState({
                        interestRate,
                        interestAmount,
                        repaymentAmount,
                        collateralAmount,
                        liquidationPrice: liquidationPrice.toFixed(6),
                        tokenAddress: token.contractAddress,
                        assets: res.payload,
                    })
                }
            })
    }

    handleGenerateSecretBtn = async (e) => {
        e.preventDefault()
        const { dispatch } = this.props

        const message = 'You are signing this message to generate secrets for the Hash Time Locked Contracts required to create the loan.'

        if (!window.ethereum) {
            console.log('error no ethereum')
        }

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()

        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]
        // sign message
        const messageB1 = await web3.eth.personal.sign(message, from)
        // generate secretB1
        const secretB1 = sha256(messageB1)
        // generate secretHashB1
        const secretHashB1 = `0x${sha256(secretB1)}`

        // dispatch save secretHashB1
        dispatch(saveSecretHashB1(secretHashB1))
        this.setState({ signed: true })
    }

    handleCreateLoanBtn = async (e) => {
        e.preventDefault()
        const { loanRequest, payload, history, dispatch } = this.props
        const {
            secretHashB1, amount, duration, asset, collateralizationRatio
        } = loanRequest

        const { interestAmount, tokenAddress, assets, contracts } = this.state

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]
        // contract
        const token = assets.filter(a => a.assetSymbol === asset)
        const networkId = await web3.eth.net.getId()

        const blitsLoans = await new web3.eth.Contract(contracts.bCoin.abi.abi, contracts.bCoin.contractAddress)
        console.log(blitsLoans)
        // Save loan details
        const params = {
            lender: from,
            secretHashB1,
            principal: amount,
            interest: interestAmount,
            assetSymbol: asset,
            period: duration,
            collateralizationRatio,
            tokenAddress,
        }

        saveLoan(params)
            .then(data => data.json())
            .then(async (res) => {
                if (res.status === 'OK') {
                    console.log(res.payload)
                    const loan = res.payload

                    // metamask
                    const tx = await blitsLoans.methods.createLoan(
                        loan.lenderAuto,
                        loan.secretHashB1,
                        loan.secretHashAutoB1,
                        [loan.bCoinApproveExpiration, loan.bCoinLoanExpiration, loan.bCoinAcceptExpiration],
                        web3.utils.toWei(loan.principal.toString()),
                        web3.utils.toWei(loan.interest.toString()),
                        loan.tokenAddress
                    ).send({ from })
                    console.log(tx)
                    const extLoanId = tx.events.LoanCreated.returnValues.loanId
                    console.log('External Loan ID:', extLoanId)

                    dispatch(saveLoanRequestTerms({ ...loan, extLoanId }))

                    saveExtLoanId({ loanId: loan.id, extLoanId: extLoanId, coin: 'BCOIN' })
                        .then(data2 => data2.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                console.log('EXT_LOAN_ID_SAVED')
                                updateLoanState({ loanId: extLoanId, coin: 'BCOIN', loanState: 'OPEN' })
                                    .then(data3 => data3.json())
                                    .then((res3) => {
                                        history.push('/app/lend/dashboard')
                                    })
                            }
                        })

                }
            })
    }



    handleBackBtn = (e) => {
        e.preventDefault()
        this.props.history.push('/app/lend/new')
    }

    render() {

        const { loanRequest } = this.props
        let { asset } = loanRequest

        return (
            <Fragment>
                <div className="main">
                    <Navbar />
                    <section className="section app-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-8 offset-md-2">
                                    <div className="mb-4 text-center">
                                        <h2>Confirm Loan</h2>
                                        <div className="app-page-subtitle mt-2">You are about to grant a loan with the following details</div>
                                    </div>
                                    <div className="app-card shadow-lg">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6">
                                                <div className="label-title">Loan Principal</div>
                                                <div className="label-value">{loanRequest.amount} {loanRequest.asset}</div>
                                                <div className="label-title mt-4">Interest</div>
                                                <div className="label-value">{parseFloat(this.state.interestAmount).toFixed(2)} {loanRequest.asset}</div>
                                                <div className="label-title mt-4">Total Repayment Amount</div>
                                                <div className="label-value">{parseFloat(this.state.repaymentAmount).toFixed(2)} {loanRequest.asset}</div>
                                                <div className="label-title mt-4">Duration</div>
                                                <div className="label-value">{loanRequest.duration} Days</div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div className="label-title">Collateral Asset</div>
                                                <div className="label-value">ONE</div>
                                                <div className="label-title mt-4">Collateral Amount</div>
                                                <div className="label-value">{this.state.collateralAmount} ONE</div>
                                                <div className="label-title mt-4">Collateralization Ratio</div>
                                                <div className="label-value">{loanRequest.collateralizationRatio}%</div>
                                                <div className="label-title mt-4">Liquidation Price</div>
                                                <div className="label-value">{this.state.liquidationPrice} USDT</div>
                                            </div>
                                        </div>

                                        <div className="row mt-4">
                                            <div className="col-sm-12 col-md-5 offset-md-1">
                                                <button onClick={this.handleBackBtn} className="btn btn-blits-white mt-4" style={{ width: '100%' }}>Back</button>
                                            </div>
                                            <div className="c0l-sm-12 col-md-5">
                                                {
                                                    !this.state.signed
                                                        ?
                                                        <button onClick={this.handleGenerateSecretBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                    Generate Secret</button>
                                                        :
                                                        <button onClick={this.handleCreateLoanBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                    Create Loan</button>
                                                }

                                            </div>
                                        </div>
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

export default connect(mapStateToProps)(LoanTerms)