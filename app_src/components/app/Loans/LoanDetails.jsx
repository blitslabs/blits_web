import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

// Components
import Navbar from './Navbar'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Loading from '../../Loading'

// Styles
import '../styles.css'

// Libraries
import Web3 from 'web3'
import { sha256 } from '@liquality-dev/crypto'
import moment from 'moment'
import { Harmony, HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
import ReactLoading from 'react-loading'
import BigNumber from 'bignumber.js'
import { toast } from 'react-toastify'
import Stepper from 'react-stepper-horizontal'
import BlitsLoans from '../../../crypto/BlitsLoans'
import ETH from '../../../crypto/ETH'

// API
import { getLoanDetails } from '../../../utils/api'

// Actions
import { saveLoanDetails } from '../../../actions/loanDetails'


class LoanDetails extends Component {
    state = {
        loading: true,
        loadingBtn: false,
        loanId: '',
    }

    componentDidMount() {
        const { history, match, dispatch, loanDetails } = this.props
        const { loanId } = match.params

        console.log(loanId)

        document.title = `Loan Details #${loanId}`

        if (!loanId) {
            history.push('/app/borrow')
        }

        getLoanDetails({ loanId })
            .then(data => data.json())
            .then((res) => {

                if (res.status === 'OK') {
                    dispatch(saveLoanDetails(res.payload))
                    this.setState({ loanId, loading: false, })
                    this.checkLoanStatus(loanId)
                }
            })
    }


    /**
     * @dev Lock Collateral
     */
    handleLockCollateralBtn = async (e) => {
        e.preventDefault()
        const { loanDetails, prices, loanSettings } = this.props
        const {
            aCoinLenderAddress, secretHashB1, principal
        } = loanDetails
        const { one_lock_contract } = loanSettings

        const collateralPrice = BigNumber(prices.ONE.priceBTC).times(prices.BTC.priceUSD)
        const requiredCollateral = parseFloat(BigNumber(principal).div(collateralPrice).times(1.5)).toFixed(2)

        this.setState({ loadingBtn: true })

        // Generate secretHash
        const message = 'You are signing this message to generate secrets for the Hash Time Locked Contracts required to lock the collateral.'
        const signResponse = await ETH.generateSecret(message)

        if (signResponse.status !== 'OK') {
            console.log(signResponse)
            toast.error(signResponse.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            return
        }

        const { secret, secretHash } = signResponse.payload
        const secretA1 = secret
        const secretHashA1 = secretHash

        // Get ETH account
        const ethAccountResponse = await ETH.getAccount()

        if (ethAccountResponse.status !== 'OK') {
            console.log(ethAccountResponse)
            toast.error(ethAccountResponse.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ loadingBtn: false })
            return
        }

        const bCoinBorrowerAddress = ethAccountResponse.payload

        const response = await BlitsLoans.ONE.lockCollateral(
            //requiredCollateral,
            '100', // testnet - change in production
            aCoinLenderAddress,
            secretHashA1,
            secretHashB1,
            one_lock_contract,
            bCoinBorrowerAddress,
            '0', // shard
            'testnet' // change in production
        )

        if (response.status !== 'OK') {
            toast.error(response.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ loadingBtn: false })
            return
        }

        this.setState({ loadingBtn: false })
    }

    handleWithdrawBtn = async (e) => {
        e.preventDefault()
        const { loanDetails, loanSettings } = this.props
        const { blockchainLoanId } = loanDetails
        const { eth_loans_contract } = loanSettings

        this.setState({ loadingBtn: true })

        // Generate secretHash
        const message = 'You are signing this message to generate secrets for the Hash Time Locked Contracts required to lock the collateral.'
        const signResponse = await ETH.generateSecret(message)

        if (signResponse.status !== 'OK') {
            console.log(signResponse)
            toast.error(signResponse.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            return
        }

        const { secret, secretHash } = signResponse.payload
        const secretA1 = `0x${secret}`
        const secretHashA1 = secretHash

        const response = await BlitsLoans.ETH.withdrawPrincipal(
            blockchainLoanId,
            secretA1,
            eth_loans_contract
        )

        if (response.status !== 'OK') {
            toast.error(response.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ loadingBtn: false })
            return
        }

        toast.success('Principal Withdrawn', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }

    handleRepayBtn = async (e) => {
        e.preventDefault()
        const { loanDetails, loanSettings } = this.props
        const { blockchainLoanId } = loanDetails
        const { eth_loans_contract } = loanSettings

        this.setState({ loadingBtn: true })

        const response = await BlitsLoans.ETH.repayLoan(blockchainLoanId, eth_loans_contract)

        if (response.status !== 'OK') {
            toast.error(response.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ loadingBtn: false })
            return
        }

        toast.success('Loan Repaid', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }

    handleAcceptRepaymentBtn = async (e) => {
        e.preventDefault()
        const { loanDetails, loanSettings } = this.props
        const { blockchainLoanId } = loanDetails
        const { eth_loans_contract } = loanSettings

        this.setState({ loadingBtn: true })

        // Generate secretHash        
        const message = 'You are signing this message to generate secrets for the Hash Time Locked Contracts required to create the loan.'
        const signResponse = await ETH.generateSecret(message)
        
        if (signResponse.status !== 'OK') {
            toast.error(signResponse.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ loadingBtn: false })
            return
        }

        const { secret, secretHash } = signResponse.payload
        const secretB1 = `0x${secret}`
        const secretHashB1 = secretHash

        const response = await BlitsLoans.ETH.acceptRepayment(blockchainLoanId, secretB1, eth_loans_contract)

        if(response.status !== 'OK') {
            toast.error(response.message, { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({ loadingBtn: false })
            return
        }

        toast.success('Loan Payback Accepted', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }

    checkLoanStatus = async (loanId) => {

        const { loanDetails, dispatch } = this.props
        const { status } = loanDetails
        console.log(loanId)
        if (!loanId || !status) return

        setInterval(() => {
            getLoanDetails({ loanId })
                .then(data => data.json())
                .then((res) => {
                    if (res.status === 'OK') {
                        if (status != res.payload.status) {
                            console.log(res)
                            this.setState({ loadingBtn: false })
                            dispatch(saveLoanDetails(res.payload))
                        }
                    }
                })
        }, 2000)
    }

    handleUnlockCollateralBtn = async (e) => {
        console.log('UNLOCK_COLLATERAL_BTN')
        e.preventDefault()
        const { loanRequest, dispatch } = this.props
        const { contracts, loan } = this.state

        this.setState({ loadingHarmony: true })

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
                        this.setState({ loan: { ...this.state.loan, aCoinState: 'CLOSED' }, loadingHarmony: false })
                    }
                })

        }).on('error', console.error)
    }


    handleBackBtn = (e) => {
        e.preventDefault()
        this.props.history.push('/app/lend/new')
    }

    render() {

        const { loanDetails, prices } = this.props
        const { loanId, loading, loadingBtn } = this.state

        if (loading) {
            return <Loading />
        }

        const {
            tokenSymbol, tokenName, tokenContractAddress, principal, interest, loanExpiration,
            status, lender, borrower, blockchainLoanId, collateralLock,
        } = loanDetails

        const collateralPrice = BigNumber(prices.ONE.priceBTC).times(prices.BTC.priceUSD)
        const requiredCollateral = parseFloat(BigNumber(principal).div(collateralPrice).times(1.5)).toFixed(2)
        const requiredCollateralValue = parseFloat(BigNumber(requiredCollateral).times(collateralPrice)).toFixed(2)
        const repaymentAmount = parseFloat(BigNumber(principal).plus(interest)).toFixed(8)
        const apr = parseFloat(BigNumber(interest).times(100).div(principal).times(12)).toFixed(2)
        const loanStatus = status == 1 ? 'Funded' : status == 2 ? 'Approved' : status == 3 ? 'Withdrawn' : status == 4 ? 'Repaid' : status == 5 ? 'Payback Refunded' : status == 6 ? 'Closed' : status == 7 ? 'Canceled' : ''

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
                                        <div className="app-page-subtitle mt-2">ID #{loanId}</div>
                                    </div>
                                    <div className="app-card shadow-lg">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-4">
                                                <div className="label-title">Borrow (Principal)</div>
                                                <div className="label-value">{principal} {tokenSymbol}</div>
                                                <div className="label-title mt-4">Interest</div>
                                                <div className="label-value">{parseFloat(interest).toFixed(2)} {tokenSymbol}</div>
                                                <div className="label-title mt-4">Repay</div>
                                                <div className="label-value">{parseFloat(repaymentAmount).toFixed(2)} {tokenSymbol}</div>
                                                <div className="label-title mt-4">Loan Expiration</div>
                                                <div className="label-value">30 days</div>
                                            </div>
                                            <div className="col-sm-12 col-md-4">
                                                <div className="label-title">APR</div>
                                                <div className="label-value">{apr}%</div>
                                                <div className="label-title mt-4">Required Collateral</div>
                                                <div className="label-value">{requiredCollateral} ONE</div>
                                                <div className="label-title mt-4">Collateral Value</div>
                                                <div className="label-value">${requiredCollateralValue} USDT</div>
                                                <div className="label-title mt-4">Coll. Ratio</div>
                                                <div className="label-value">150%</div>
                                            </div>
                                            <div className="col-sm-12 col-md-4">
                                                <div className="label-title">Loan Status</div>
                                                <div className="label-value" style={{ color: '#32ccdd' }}>{loanStatus}</div>
                                                <div className="label-title mt-4">Lender</div>
                                                <div className="label-value">
                                                    <a target='_blank' href={'https://etherscan.com/address/' + lender}>{lender.substring(0, 4)}...{lender.substr(lender.length - 4)}</a>
                                                </div>
                                                <div className="label-title mt-4">Borrower</div>
                                                <div className="label-value">
                                                    <a target='_blank' href={'https://etherscan.com/address/' + borrower}>{borrower.substring(0, 4)}...{borrower.substr(borrower.length - 4)}</a>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="row mt-4">
                                            <div className="col-sm-12 col-md-8 offset-md-2 text-center">
                                                {
                                                    loadingBtn && (
                                                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                                            <div style={{ color: '#32CCDD', fontWeight: 'bold', textAlign: 'justify' }}>Waiting for TX to confirm. Please be patient, Ethereum can be slow sometimes :)</div>
                                                            <ReactLoading className="loading-icon" type={'cubes'} color="#32CCDD" height={40} width={60} />
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (status == 1 && !loadingBtn) && (
                                                        <button onClick={this.handleLockCollateralBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/one_logo.png'} alt="" />
                                                            Lock Collateral
                                                        </button>
                                                    )
                                                }

                                                {
                                                    (status == 2 && !loadingBtn) && (
                                                        <button onClick={this.handleWithdrawBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                            Withdraw Principal
                                                        </button>
                                                    )
                                                }

                                                {
                                                    (status == 3 && !loadingBtn) && (
                                                        <button onClick={this.handleRepayBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                            Repay Loan
                                                        </button>
                                                    )
                                                }

                                                {
                                                    (status == 4 && !loadingBtn) && (
                                                        <button onClick={this.handleAcceptRepaymentBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                            <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                            Accept Repayment
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        {/* <div className="row mt-4">

                                            <div className="c0l-sm-12 col-md-12 text-center">
                                                {
                                                    this.state.loading
                                                        ?
                                                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                                            <div style={{ color: '#32CCDD', fontWeight: 'bold', textAlign: 'justify' }}>Waiting for TX to confirm. Please be patient, Ethereum can be slow sometimes :)</div>
                                                            <ReactLoading className="loading-icon" type={'cubes'} color="#32CCDD" height={40} width={60} />
                                                        </div>
                                                        :
                                                        this.state.loadingHarmony
                                                            ?
                                                            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                                                <ReactLoading className="loading-icon" type={'cubes'} color="#32CCDD" height={40} width={60} />
                                                            </div>
                                                            :
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
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="row" style={{ marginTop: '60px' }}>
                        <div className="col-sm-6 offset-sm-3 text-center">
                            <Stepper
                                steps={[
                                    { title: 'Funded' },
                                    { title: 'Lock Collateral' },
                                    { title: 'Withdraw Principal' },
                                    { title: 'Repay Loan' },
                                    { title: 'Repayment Accepted' },
                                ]}
                                activeStep={parseInt(status)}
                                completeBarColor="#32CCDD"
                                completeColor="#32CCDD"
                                activeColor="black"
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


function mapStateToProps({ loanDetails, prices, loanSettings }) {
    return {
        loanDetails, prices, loanSettings
    }
}

export default connect(mapStateToProps)(LoanDetails)