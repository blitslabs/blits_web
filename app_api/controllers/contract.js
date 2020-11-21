const Settings = require('../models/sequelize').Settings
const Asset = require('../models/sequelize').Asset
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
        const assets = await Asset.findAll({ transaction: t })

        const aCoinAbi = fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/HarmonyLock.json'))
        const bCoinAbi = fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/BlitsLoans.json'))
        const daiAbi = fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/DAI.json'))
        const busdABI = fs.readFileSync(path.resolve(APP_ROOT + '/app_api/config/DAI.json'))

        const payload = {
            aCoin: {
                contractAddress: settings.aCoinContractAddress,
                abi: JSON.parse(aCoinAbi)
            },
            bCoin: {
                contractAddress: settings.bCoinContractAddress,
                abi: JSON.parse(bCoinAbi)
            },
            DAI: {
                contractAddress: assets.filter(a => a.assetSymbol === 'DAI')[0].contractAddress,
                abi: JSON.parse(daiAbi)
            },
            BUSD: {
                contractAddress: assets.filter(a => a.assetSymbol === 'BUSD')[0].contractAddress,
                abi: JSON.parse(busdABI)
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