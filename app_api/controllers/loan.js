const Loan = require('../models/sequelize').Loan
const Settings = require('../models/sequelize').Settings
const Asset = require('../models/sequelize').Asset
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const EthCrypto = require('eth-crypto')
const Web3Utils = require('web3-utils')
const { sha256 } = require('@liquality-dev/crypto')
const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const moment = require('moment')
const fs = require('fs')
const path = require('path')

module.exports.getLoansByStatus = (req, res) => {
    const state = req.params.state ? req.params.state : 'ALL'

    sequelize.transaction(async (t) => {

        let loans

        if (state === 'ALL') {
            loans = await Loan.findAll({ transaction: t })
        } else {
            loans = await Loan.findAll({
                where: {
                    bCoinState: state,
                },
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: loans })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}

module.exports.saveLoan = (req, res) => {
    const lender = req.body.lender
    const aCoinLender = req.body.aCoinLender
    const secretHashB1 = req.body.secretHashB1
    const principal = req.body.principal
    const interest = req.body.interest
    const assetSymbol = req.body.assetSymbol
    const period = parseInt(req.body.period)
    const collateralizationRatio = req.body.collateralizationRatio

    if (!lender || !aCoinLender || !secretHashB1 || !principal || !interest || !assetSymbol || !period || !collateralizationRatio) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        const settings = await Settings.findOne({ where: { id: 1 }, transaction: t })

        if (!settings) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again' })
            return
        }

        const asset = await Asset.findOne({ where: { assetSymbol }, transaction: t })

        if (!asset) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Asset not found' })
            return
        }

        // const test = 'dddf8b9aa365fccfcd65788a8b90f826b95a538dd13d3498f11c7d3ca6703557'

        // Generate SecretHashAutoB1
        const messageAutoB1 = Math.random().toString()
        const secretAutoB1 = sha256(messageAutoB1)
        const secretHashAutoB1 = `0x${sha256(secretAutoB1)}`

        // Expirations
        const approveIncrement = parseInt(period * 0.25)
        const acceptIncrement = parseInt(period * 1.25)
        console.log(approveIncrement)
        console.log(acceptIncrement)

        const currentTime = moment()
        const loanExpiration = moment().add(period, 'days').unix()
        const approveExpiration = moment().add(approveIncrement, 'days').unix()
        const acceptExpiration = moment().add(acceptIncrement, 'days').unix()

        console.log(loanExpiration)
        console.log(approveExpiration)
        console.log(acceptExpiration)

        const loan = await Loan.create({
            lender,
            aCoinLender,
            secretHashB1,
            lenderAuto: settings.bCoinPubKey,
            secretAutoB1,
            secretHashAutoB1,
            principal,
            interest,
            assetSymbol,
            tokenAddress: asset.contractAddress,
            secretAutoB1,
            secretHashAutoB1,
            bCoinLoanExpiration: loanExpiration,
            bCoinApproveExpiration: approveExpiration,
            bCoinAcceptExpiration: acceptExpiration,
            collateralizationRatio
        }, { transaction: t })

        const payload = {
            ...JSON.parse(JSON.stringify(loan)),
            secretAutoB1: '',
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: payload })
        return
    })
        .catch((err) => {
            console.log('test')
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}

module.exports.saveBorrowerRequest = (req, res) => {
    const loanId = req.body.loanId
    const secretHashA1 = req.body.secretHashA1
    const aCoinBorrower = req.body.aCoinBorrower
    const bCoinBorrower = req.body.bCoinBorrower

    if (!loanId || !secretHashA1 || !aCoinBorrower || !bCoinBorrower) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        const loan = await Loan.findOne({ where: { id: loanId }, transaction: t })

        if (!loan) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Loan not found' })
            return
        }

        const collateralAsset = await Asset.findOne({ where: { assetSymbol: 'ONE' }, transaction: t })

        // Generate SecretHashAutoB1
        const messageAutoA1 = Math.random().toString()
        const secretAutoA1 = sha256(messageAutoA1)
        const secretHashAutoA1 = `0x${sha256(secretAutoA1)}`

        const seizableCollateral = parseFloat(loan.principal) / parseFloat(collateralAsset.priceUSD)
        const totalCollateral = (seizableCollateral * parseFloat(loan.collateralizationRatio) / 100)
        const refundableCollateral = totalCollateral - seizableCollateral

        loan.secretHashA1 = secretHashA1
        loan.secretHashAutoA1 = secretHashAutoA1
        loan.aCoinSeizableCollateral = seizableCollateral
        loan.aCoinRefundableCollateral = refundableCollateral
        loan.aCoinBorrower = aCoinBorrower
        loan.borrower = bCoinBorrower
        loan.aCoinLoanExpiration = loan.bCoinAcceptExpiration
        loan.aCoinSeizureExpiration = parseFloat(loan.bCoinAcceptExpiration) + (86400 * 3)

        await loan.save({ transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: loan })
        return
    })
        .catch((err) => {
            console.log('test')
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}

module.exports.saveLoanId = (req, res) => {
    const loanId = req.body.loanId
    const extLoanId = req.body.extLoanId
    const coin = req.body.coin

    if (!loanId || !extLoanId || !coin) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        const loan = await Loan.findOne({ where: { id: loanId }, transaction: t })

        if (!loan) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Contract not found' })
            return
        }

        if (coin === 'ACOIN') {
            loan.aCoinLoanId = extLoanId
        } else if (coin === 'BCOIN') {
            loan.bCoinLoanId = extLoanId
        }

        await loan.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', message: 'External Loan ID updated' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}

module.exports.updateLoanState = (req, res) => {
    const loanId = req.body.loanId
    const coin = req.body.coin
    const loanState = req.body.loanState

    if (!loanId || !coin || !loanState) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }


    sequelize.transaction(async (t) => {

        let loan

        if(coin === 'BCOIN') {
            loan = await Loan.findOne({ where: { bCoinLoanId: loanId }, transaction: t })
        }
        

        if (!loan) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Contract not found' })
            return
        }

        if (coin === 'ACOIN') {
            loan.aCoinState = loanState
        } else if (coin === 'BCOIN') {
            loan.bCoinState = loanState
        }

        await loan.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', message: 'External Loan ID updated' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}

module.exports.getLoans = (req, res) => {
    const account = req.params.account
    const userType = req.params.userType
    const loanState = req.params.loanState ? req.params.loanState : 'ALL'

    if (!account || !userType) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        let loans

        if (userType === 'LENDER') {
            if (loanState === 'ALL') {
                loans = await Loan.findAll({ where: { lender: account }, transaction: t })
            } else {
                loans = await Loan.findAll({ where: { lender: account, bCoinState: loanState }, transaction: t })
            }
        } else if (userType === 'BORROWER') {
            if (loanState === 'ALL') {
                loans = await Loan.findAll({ where: { borrower: account }, transaction: t })
            } else {
                loans = await Loan.findAll({ where: { borrower: account, aCoinState: loanState }, transaction: t })
            }
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: loans })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })

}

module.exports.getLoanDetails = (req, res) => {
    const loanId = req.params.loanId

    if (!loanId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const loan = await Loan.findOne({ where: { id: loanId }, transaction: t })
        if (!loan) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Loan not found' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: loan })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}

module.exports.assignBorrowerAndApprove = (req, res) => {
    const loanId = req.params.loanId

    if (!loanId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        const loan = await Loan.findOne({ where: { id: loanId }, transaction: t })

        if (!loan) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Loan not found' })
            return
        }

        if (loan.bCoinState !== 'FUNDED') {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Invalid laon state' })
            return
        }

        const settings = await Settings.findOne({ where: { id: 1 }, transaction: t })

        // Get Contract ABI
        const bCoinAbi = JSON.parse(fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/BlitsLoans.json')))

        // Connect to HTTP Provider
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_HTTP_PROVIDER))

        // Instantiate Contract
        const blitsLoans = await new web3.eth.Contract(bCoinAbi.abi, settings.bCoinContractAddress)
        
        // Get Nonce
        const count = await web3.eth.getTransactionCount(settings.bCoinPubKey)
        
        // List of ChainIDs
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md
        // Prepare Raw Transaction

        const chainId = await web3.eth.getChainId()
        const chainName = await web3.eth.net.getNetworkType()
        
        const data =  await blitsLoans.methods.setBorrowerAndApprove(loan.bCoinLoanId, loan.borrower, loan.secretHashA1).encodeABI()

        const rawTx = {
            from: settings.bCoinPubKey,
            nonce: '0x' + count.toString(16),
            gasPrice: '0x003B9ACA00',
            gasLimit: '0x250CA',
            to: settings.bCoinContractAddress,
            value: '0x0',
            chainId: '0x0' + chainId,
            data: data
        }
        
        // Create TX
        const tx = new Tx(rawTx)

        // Sign TX
        const privateKey = new Buffer(settings.bCoinPrivKey, 'hex')
        tx.sign(privateKey)
        const serializedTx = tx.serialize()

        // Broadcast TX
        return web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), async (err, txHash) => {
            if (err) {
                console.log(err)
                sendJSONresponse(res, 422, { status: 'ERROR', message: err })
                return
            }

            // Update Loan
            loan.bCoinState = 'APPROVED'
            await loan({ transaction: t })

            sendJSONresponse(res, 200, { status: 'OK', message: 'Loan Approved', payload: txHash })
            return

        })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}