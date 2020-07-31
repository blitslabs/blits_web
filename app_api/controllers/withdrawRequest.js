const User = require('../models/sequelize').User
const WithdrawRequest = require('../models/sequelize').WithdrawRequest
const Account = require('../models/sequelize').Account
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getWithdrawRequestDetails = (req, res) => {
    const requestId = req.params.requestId

    if (!requestId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const withdrawRequest = await WithdrawRequest.findOne({ where: { id: requestId, }, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: withdrawRequest })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}


module.exports.approveWithdrawRequest = (req, res) => {
    const requestId = req.params.requestId

    if (!requestId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await WithdrawRequest.update({
            status: 'COMPLETED',
        }, { where: { id: requestId, }, limit: 1, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', message: 'Estado de la petición de retiro actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.approveAllWithdrawRequests = (req, res) => {  
    sequelize.transaction(async (t) => {
        await WithdrawRequest.update({
            status: 'COMPLETED',
        }, { where: { status: 'PENDING', }, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', message: 'Estado de la petición de los retiros actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.getWithdrawByStatusAndPage = (req, res) => {
    const status = req.params.status ? req.params.status : 'ALL'
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, withdrawRequests, pages
        if (status === 'ALL') {
            results = await WithdrawRequest.findAndCountAll({ transaction: t })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            withdrawRequests = await WithdrawRequest.findAll({
                include: [
                    { model: User },
                    { model: Account }
                ],
                limit,
                offset,
                transaction: t
            })
        } else {
            results = await WithdrawRequest.findAndCountAll({ where: { status }, transaction: t })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            withdrawRequests = await WithdrawRequest.findAll({
                where: {
                    status,
                },
                include: [
                    { model: User },
                    { model: Account }
                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: withdrawRequests, pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}