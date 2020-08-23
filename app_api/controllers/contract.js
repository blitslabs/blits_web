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
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'ABI not found'})
        return
    }

    sendJSONresponse(res, 200, { status: 'OK', payload: JSON.parse(data) })
    return
}