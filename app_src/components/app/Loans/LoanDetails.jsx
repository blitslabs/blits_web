import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
// Styles
import '../styles.css'

// Actions
import { saveLoanRequestTerms, saveSecretHashA1 } from '../../../actions/loanRequest'

// API
import { getAssets, acceptRepayment, getLoanDetails, saveExtLoanId, updateLoanState, getContractsData } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import { sha256 } from '@liquality-dev/crypto'
import moment from 'moment'
import { Harmony, HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
const hmy = new Harmony('https://api.s0.b.hmny.io', {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
    shardID: 0
})

// const web3 = new Web3(process.env.WEB3_HTTP_PROVIDER)

class LoanDetails extends Component {
    state = {
        interestAmount: 0,
        repaymentAmount: 0,
        collateralAmount: 0,
        liquidationPrice: 0,
        assets: [],
        abi: '',
        signed: false,
        contracts: '',
        loan: ''
    }

    componentDidMount() {
        const { history, match } = this.props
        const { loanId } = match.params

        console.log(loanId)

        document.title = 'Loan Details | Borrower'
        if (!loanId) {
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

        getLoanDetails({ loanId })
            .then(data => data.json())
            .then((res) => {
                if (res.status === 'OK') {
                    const loan = res.payload
                    getAssets()
                        .then(data2 => data2.json())
                        .then((res2) => {
                            if (res2.status === 'OK') {
                                const token = res2.payload.filter(a => a.assetSymbol === loan.assetSymbol)
                                const collateralAsset = res2.payload.filter(a => a.assetSymbol === 'ONE')

                                const baseCollateral = parseFloat(loan.principal) / parseFloat(collateralAsset[0].priceUSD)
                                const collateralAmount = (baseCollateral * parseFloat(loan.collateralizationRatio) / 100).toFixed(2)
                                const liquidationPrice = collateralAsset[0].priceUSD - ((parseFloat(loan.collateralizationRatio) - 100) / 100) * parseFloat(collateralAsset[0].priceUSD)

                                this.setState({
                                    interestRate: loan.interest,
                                    interestAmount: loan.interest,
                                    repaymentAmount: parseFloat(loan.principal) + parseFloat(loan.interest),
                                    collateralAmount,
                                    liquidationPrice: liquidationPrice.toFixed(6),
                                    collateralizationRatio: loan.collateralizationRatio,
                                    assets: res.payload,
                                })
                            }
                        })
                    this.setState({ loan: res.payload })
                }
            })

    }


    handleWithdrawBtn = async (e) => {
        e.preventDefault()
        const { loanRequest } = this.props
        const { contracts, loan } = this.state

        console.log('WITHDRAW_LOAN_BTN')

        if (!window.ethereum) {
            console.log('error: no ethereum')
            return
        }

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]

        const blitsLoans = await new web3.eth.Contract(contracts.bCoin.abi.abi, contracts.bCoin.contractAddress)
        const tx = await blitsLoans.methods.withdraw(loan.bCoinLoanId, ('0x' + loanRequest.secretA1)).send({ from })
        console.log(tx)

        if ('blockHash' in tx) {
            updateLoanState({ loanId: loan.bCoinLoanId, coin: 'BCOIN', loanState: 'WITHDRAWN' })
                .then(data => data.json())
                .then((res) => {
                    this.setState({ loan: { ...this.state.loan, bCoinState: 'WITHDRAWN' } })
                })
        }
    }

    handleRepayBtn = async (e) => {
        console.log('REPAY_LOAN_BTN')
        e.preventDefault()
        const { loanRequest, dispatch } = this.props
        const { contracts, loan } = this.state

        if (!window.ethereum) {
            console.log('error: no ethereum')
            return
        }

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]

        // Check allowance
        const stablecoin = await new web3.eth.Contract(contracts[loanRequest.assetSymbol].abi.abi, contracts[loanRequest.assetSymbol].contractAddress)
        let allowance = await stablecoin.methods.allowance(from, contracts.bCoin.contractAddress).call()
        allowance = web3.utils.fromWei(allowance)
        console.log('Allowance:', allowance)

        const repaymentAmount = Math.ceil(parseFloat(loan.principal) + parseFloat(loan.interest))
        
        if (!allowance || parseFloat(allowance) < repaymentAmount) {
            await stablecoin.methods.approve(contracts.bCoin.contractAddress, web3.utils.toWei(repaymentAmount.toString())).send({ from })
            return
        }

        // Repay loan
        const blitsLoans = await new web3.eth.Contract(contracts.bCoin.abi.abi, contracts.bCoin.contractAddress)
        let tx

        try {
            tx = await blitsLoans.methods.payback(loan.bCoinLoanId.toString()).send({ from })
        } catch (e) {
            console.log(e)
            return
        }

        if ('blockHash' in tx) {
            updateLoanState({ loanId: loan.bCoinLoanId, coin: 'BCOIN', loanState: 'REPAID' })
                .then(data => data.json())
                .then((res) => {
                    if (res.status === 'OK') {
                        this.setState({ loan: { ...this.state.loan, bCoinState: 'REPAID' } })
                        acceptRepayment({ loanId: loan.id })
                            .then(data2 => data2.json())
                            .then((res2) => {
                                if (res2.status === 'OK') {
                                    this.setState({ loan: { ...this.state.loan, bCoinState: 'CLOSED' } })
                                    dispatch(saveLoanRequestTerms({ secretAutoB1: res2.payload.secretAutoB1 }))
                                }
                            })
                    }
                })
        }
    }

    handleUnlockCollateralBtn = async (e) => {
        console.log('UNLOCK_COLLATERAL_BTN')
        e.preventDefault()
        const { loanRequest, dispatch } = this.props
        const { contracts, loan } = this.state
        const harmonyExt = await new HarmonyExtension(window.onewallet, { chainId: 2, chainType: ChainType.Harmony, shardID: 0, chainUrl: 'https://api.s0.b.hmny.io' });
        const account = await harmonyExt.login()
        const from = hmy.crypto.getAddress(account.address).checksum
        const harmonyLock = await harmonyExt.contracts.createContract(contracts.aCoin.abi.abi, contracts.aCoin.contractAddress)

        // Unlock collateral
        const tx = await harmonyLock.methods.unlockCollateralAndCloseLoan(
            loan.aCoinLoanId,
            loanRequest.secretAutoB1
        ).send({
            value: new hmy.utils.Unit(0).asOne().toWei(),
            gasLimit: '1000001',
            gasPrice: new hmy.utils.Unit(1000000000).asGwei().toWei(),
        }).on('transactionHash', function (hash) {
            console.log('hash', hash)
        }).on('receipt', function (receipt) {
            console.log('receipt', receipt)
        }).on('confirmation', async (confirmation) => {
            console.log('confirmation', confirmation)
            if (confirmation === 'REJECTED') alert('TX was rejected')

            updateLoanState({ loanId: loan.aCoinLoanId, coin: 'ACOIN', loanState: 'CLOSED' })
                .then(data => data.json())
                .then((res) => {
                    console.log(res)
                    if (res.status === 'OK') {
                        this.setState({ loan: { ...this.state.loan, aCoinState: 'CLOSED' } })
                    }
                })

        }).on('error', console.error)
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
                                        <h2>Loan Details </h2>
                                        <div className="app-page-subtitle mt-2">ID #{this.state.loan.id}</div>
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
                                                <div className="label-title mt-4">Loan Expiration</div>
                                                <div className="label-value">{moment(this.state.loan.loanExpiration).format('MM/DD/YY HH:mm')} </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div className="label-title">Collateral Asset</div>
                                                <div className="label-value">ONE</div>
                                                <div className="label-title mt-4">Collateral Amount</div>
                                                <div className="label-value">{this.state.collateralAmount} ONE</div>
                                                <div className="label-title mt-4">Collateralization Ratio</div>
                                                <div className="label-value">{this.state.collateralizationRatio}%</div>
                                                <div className="label-title mt-4">Liquidation Price</div>
                                                <div className="label-value">{this.state.liquidationPrice} USDT</div>
                                            </div>
                                        </div>

                                        <div className="row mt-4">

                                            <div className="c0l-sm-12 col-md-12 text-center">
                                                {
                                                    this.state.loan.bCoinState === 'APPROVED'
                                                        ?
                                                        <button onClick={this.handleWithdrawBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                    Withdraw Principal</button>
                                                        :
                                                        this.state.loan.bCoinState === 'WITHDRAWN'
                                                            ?
                                                            <button onClick={this.handleRepayBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                                <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                    Repay Loan</button>
                                                            :
                                                            this.state.loan.bCoinState === 'CLOSED' && this.state.loan.aCoinState === 'LOCKED'
                                                                ? <button onClick={this.handleUnlockCollateralBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                                    <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/one_logo.png'} alt="" />Unlock Collateral</button>

                                                                : null

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

export default connect(mapStateToProps)(LoanDetails)