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
import { getAssets, saveBorrowerRequest, getLoanDetails, saveExtLoanId, updateLoanState, getContractsData, assignBorrower } from '../../../utils/api'

// Libraries
import Web3 from 'web3'
import { sha256 } from '@liquality-dev/crypto'
import moment from 'moment'
import { Harmony, HarmonyExtension } from '@harmony-js/core'
import { ChainID, ChainType } from '@harmony-js/utils'
import ReactLoading from 'react-loading'

const hmy = new Harmony('https://api.s0.b.hmny.io', {
    chainType: ChainType.Harmony,
    chainId: ChainID.HmyTestnet,
    shardID: 0
})

// const web3 = new Web3(process.env.WEB3_HTTP_PROVIDER)

class ConfirmLoanBorrower extends Component {
    state = {
        interestAmount: 0,
        repaymentAmount: 0,
        collateralAmount: 0,
        liquidationPrice: 0,
        assets: [],
        abi: '',
        signed: false,
        contracts: '',
        loan: '',
        loading: false,
    }

    componentDidMount() {
        const { history, match } = this.props
        const { loanId } = match.params

        console.log(loanId)

        document.title = 'Confirm Loan | Borrower'
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

    handleTestBtn = async (e) => {
        const { contracts, loan } = this.state
        const { loanRequest, history } = this.props

        this.setState({ loading: true })

        const address = '0xE90075b75772A4d0f865A8ccfc061e4E0E001327';
        const harmonyExt = await new HarmonyExtension(window.onewallet, { chainId: 2, chainType: ChainType.Harmony, shardID: 0, chainUrl: 'https://api.s0.b.hmny.io' });
        const account = await harmonyExt.login()
        const from = hmy.crypto.getAddress(account.address).checksum
        const harmonyLock = await harmonyExt.contracts.createContract(contracts.aCoin.abi.abi, address)
        const loanTx = await harmonyLock.methods.fetchLoan(1).call({
            gasLimit: '4000000',
            gasPrice: new hmy.utils.Unit('1').asGwei().toWei(),
        })

        const params = {
            loanId: loan.id,
            secretHashA1: loanRequest.secretHashA1,
            aCoinBorrower: from, // Harmony
            bCoinBorrower: loanRequest.bCoinBorrower, // Ethereum
        }

        let loanCount = await harmonyLock.methods.loanCounter().call({
            gasLimit: '4000000',
            gasPrice: new hmy.utils.Unit('1').asGwei().toWei(),
        })

        loanCount = loanCount.toString()

        saveBorrowerRequest(params)
            .then(data => data.json())
            .then(async (res) => {
                console.log(res)

                if (res.status === 'OK') {
                    const lender = hmy.crypto.getAddress(res.payload.aCoinLender).checksum
                    const totalCollateral = parseFloat(res.payload.aCoinRefundableCollateral) + parseFloat(res.payload.aCoinSeizableCollateral)



                    const tx = await harmonyLock.methods.lockCollateral(
                        lender,
                        res.payload.secretHashA1,
                        res.payload.secretHashB1,
                        res.payload.secretHashAutoA1,
                        res.payload.secretHashAutoB1,
                        res.payload.aCoinLoanExpiration,
                        res.payload.aCoinSeizureExpiration,
                        150
                    ).send({
                        value: new hmy.utils.Unit(res.payload.principal).asOne().toWei(),
                        gasLimit: '1000001',
                        gasPrice: new hmy.utils.Unit(totalCollateral.toFixed(2).toString()).asGwei().toWei(),
                    }).on('transactionHash', function (hash) {
                        console.log('hash', hash)
                    }).on('receipt', function (receipt) {
                        console.log('receipt', receipt)
                    }).on('confirmation', async (confirmation) => {
                        console.log('confirmation', confirmation)
                        if (confirmation === 'REJECTED') alert('TX was rejected')

                        saveExtLoanId({ loanId: loan.id, extLoanId: (parseInt(loanCount) + 1), coin: 'ACOIN' })
                            .then(data2 => data2.json())
                            .then((res2) => {
                                console.log(res2)
                            })

                        assignBorrower({ loanId: loan.id })
                            .then(data2 => data2.json())
                            .then((res2) => {
                                console.log(res2)
                                if (res2.status === 'OK') {
                                    this.setState({ loading: false })
                                    history.push(`/app/loan/${loan.id}`)
                                }
                            })

                    }).on('error', console.error)

                    console.log(tx)

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

        this.setState({ loading: true })

        const web3 = new Web3(window.ethereum)
        await window.ethereum.enable()

        const accounts = await web3.eth.getAccounts()
        const from = accounts[0]
        // sign message
        const messageA1 = await web3.eth.personal.sign(message, from)
        // generate secretB1
        const secretA1 = sha256(messageA1)
        // generate secretHashB1
        const secretHashA1 = `0x${sha256(secretA1)}`

        // dispatch save secretHashB1
        dispatch(saveSecretHashA1(secretHashA1))
        dispatch(saveLoanRequestTerms({ bCoinBorrower: from, secretA1 }))
        this.setState({ signed: true, loading: false })
    }

    // https://johnwhitton.dev/docs/docs/contribute/develop/deploy-your-first-dapp/
    handleOneWalletBtn = async (e) => {
        const { contracts, loan } = this.state
        const { loanRequest } = this.props

        const harmonyExt = await new HarmonyExtension(window.onewallet);
        console.log(harmonyExt)
        harmonyExt.setShardID(0)
        harmonyExt.contracts.wallet = harmonyExt.wallet

        // Get account
        const account = await harmonyExt.login()
        const from = hmy.crypto.getAddress(account.address).checksum

        const harmonyLock = await harmonyExt.contracts.createContract(contracts.aCoin.abi.abi, contracts.aCoin.contractAddress)

        harmonyLock.wallet.defaultSigner = from


        let options = { gasPrice: 1000000000, gasLimit: 6721900 };
        // console.log(harmonyLock)
        // let options2 = { gasPrice: 1000000000, gasLimit: 21000 }
        const contractResponse = await harmonyLock.methods.fetchLoan(0).call({
            gasLimit: '1000000',
            gasPrice: new hmy.utils.Unit('1000').asGwei().toWei(),
        })

        console.log(contractResponse)

        // return
        // harmonyLock.wallet.addByPrivateKey('01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD');
        // Save Borrower Request
        const params = {
            loanId: loan.id,
            secretHashA1: loanRequest.secretHashA1,
            aCoinBorrower: from, // Harmony
            bCoinBorrower: loanRequest.bCoinBorrower, // Ethereum
        }


        saveBorrowerRequest(params)
            .then(data => data.json())
            .then(async (res) => {
                console.log(res)

                try {

                    const tx = await harmonyLock.methods.lockCollateral(
                        hmy.crypto.getAddress(res.payload.aCoinLender).checksum,
                        res.payload.secretHashA1,
                        res.payload.secretHashB1,
                        res.payload.secretHashAutoA1,
                        res.payload.secretHashAutoB1,
                        res.payload.aCoinLoanExpiration,
                        res.payload.aCoinSeizureExpiration,
                        res.payload.collateralizationRatio
                    ).send(options)

                    console.log(tx)
                } catch (e) {
                    console.log(e)
                }
                // const txn = hmy.transactions.newTx({
                //     from: from,
                //     to: hmy.crypto.getAddress(res.payload.aCoinLender).checksum,
                //     value: '10000000000000000000000000',
                //     shardID: 0,
                //     toShardID: 0,
                //     gasLimit: '1000001',
                //     gasPrice: new hmy.utils.Unit('10').asGwei().toWei(),
                //     data,
                // })

                // const signed = await window.onewallet.signTransaction(txn)
                // console.log(signed)

            })
    }

    handleLockCollateralBtn = async (e) => {
        e.preventDefault()

        const { contracts, loan } = this.state
        const { loanRequest } = this.props

        // Ethereum
        // const web3 = new Web3(window.ethereum)
        // await window.ethereum.enable()
        // const accounts = await web3.eth.getAccounts()
        // const from = accounts[0]

        // Harmony
        // const harmonyExt = await new HarmonyExtension(window.onewallet)
        // const from = await harmonyExt.login()
        // console.log(from)
        // return
        // https://github.com/mathwallet/math-harmonyjs
        console.log(window.harmony)
        const account = await window.harmony.getAccount()
        // https://github.com/harmony-one/ethhmy-bridge.appengine/blob/b63893f6125273cd0a8f160de11bcc3f5306e139/src/blockchain/hmySdk.ts
        const from = hmy.crypto.getAddress(account.address).checksum

        // Contract
        // const harmonyLock = await new web3.eth.Contract(contracts.aCoin.abi.abi, contracts.aCoin.contractAddress)
        const harmonyLock = await hmy.contracts.createContract(contracts.aCoin.abi.abi, '0xf193EF8a329eA302319b69F29A71A5D8cDEAae55')
        // const harmonyLock = await harmonyExt.contracts.createContract(contracts.aCoin.abi.abi, contracts.aCoin.cointractAddress)

        // Save Borrower Request
        const params = {
            loanId: loan.id,
            secretHashA1: loanRequest.secretHashA1,
            aCoinBorrower: from, // Harmony
            bCoinBorrower: loanRequest.bCoinBorrower, // Ethereum
        }
        console.log(params)

        saveBorrowerRequest(params)
            .then(data => data.json())
            .then(async (res) => {
                console.log(res)
                harmonyLock.wallet.setSigner(from)
                const data = await harmonyLock.methods.lockCollateral(
                    hmy.crypto.getAddress(res.payload.aCoinLender).checksum,
                    res.payload.secretHashA1,
                    res.payload.secretHashB1,
                    res.payload.secretHashAutoA1,
                    res.payload.secretHashAutoB1,
                    res.payload.aCoinLoanExpiration,
                    res.payload.aCoinSeizureExpiration,
                    res.payload.collateralizationRatio
                )
                console.log(data)
            })

        // saveBorrowerRequest(params)
        //     .then(data => data.json())
        //     .then(async (res) => {
        //         console.log(res)
        //         // if (res.status === 'OK') {
        //         //     const tx = await harmonyLock.methods.lockCollateral(
        //         //         res.payload.aCoinLender,
        //         //         res.payload.secretHashA1,
        //         //         res.payload.secretHashB1,
        //         //         res.payload.secretHashAutoA1,
        //         //         res.payload.secrestHashAutoB1,
        //         //         res.payload.aCoinLoanExpiration,
        //         //         res.payload.aCoinSeizureExpiration,
        //         //         res.payload.collateralizationRatio
        //         //     ).send()
        //         // }
        //     })



    }



    handleBackBtn = (e) => {
        e.preventDefault()
        this.props.history.push('/app/borrow/dashboard')
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
                                        <div className="app-page-subtitle mt-2">You are about to get a loan with the following details</div>
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
                                            <div className="col-sm-12 col-md-5 offset-md-1">
                                                <button onClick={this.handleBackBtn} className="btn btn-blits-white mt-4" style={{ width: '100%' }}>Back</button>
                                            </div>
                                            <div className="c0l-sm-12 col-md-5">
                                                {
                                                    this.state.loading
                                                        ?
                                                        <div style={{ marginTop: '15px', }}>
                                                            <ReactLoading type={'cubes'} color="#32CCDD" height={40} width={60} />
                                                        </div>
                                                        :
                                                        !this.state.signed
                                                            ?
                                                            <button onClick={this.handleGenerateSecretBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                                <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/metamask_logo.png'} alt="" />
                                                    Generate Secret</button>
                                                            :
                                                            <button onClick={this.handleTestBtn} className="btn btn-blits mt-4" style={{ width: '100%' }}>
                                                                <img className="metamask-btn-img" src={process.env.SERVER_HOST + '/assets/images/one_logo.png'} alt="" />
                                                    Lock Collateral</button>
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

export default connect(mapStateToProps)(ConfirmLoanBorrower)