const Loan = require('../models/sequelize').Loan
const Settings = require('../models/sequelize').Settings
const Asset = require('../models/sequelize').Asset
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const EthCrypto = require('eth-crypto')
const Web3Utils = require('web3-utils')
const { sha256 } = require('@liquality-dev/crypto')
const web3 = require('web3')
const moment = require('moment')

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

        sendJSONresponse(res, 200, { status: 200, payload: loans })
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
    const secretHashB1 = req.body.secretHashB1
    const principal = req.body.principal
    const interest = req.body.interest
    const assetSymbol = req.body.assetSymbol
    const period = parseInt(req.body.period)
    const collateralizationRatio = req.body.collateralizationRatio

    if(!lender || !secretHashB1 || !principal || !interest || !assetSymbol || !period || !collateralizationRatio) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments'})
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
        const loan = await Loan.findOne({ where: { id: loanId }, transaction: t })

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