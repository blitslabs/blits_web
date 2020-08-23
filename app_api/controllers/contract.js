const Settings = require('../models/sequelize').Settings
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const fs = require('fs')
const path = require('path')

module.exports.getABIByContractName = (req, res) => {
    const contractName = req.params.contractName

    if (!contractName) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    let data
    if (contractName === 'BLITS') {
        data = fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/BlitsLoans.json'))
    } else {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'ABI not found' })
        return
    }

    sendJSONresponse(res, 200, { status: 'OK', payload: JSON.parse(data) })
    return
}

module.exports.getContracts = (req, res) => {
    sequelize.transaction(async (t) => {
        const settings = await Settings.findOne({ where: { id: 1 }, transaction: t })

        const bCoinAbi = fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/BlitsLoans.json'))
        const payload = {
            aCoinContractAddress: settings.aCoinContractAddress,
            bCoin: {
                contractAddress: settings.bCoinContractAddress,
                abi: JSON.parse(bCoinAbi)
            }
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