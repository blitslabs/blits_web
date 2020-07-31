const User = require('../models/sequelize').User
const Account = require('../models/sequelize').Account

const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse


module.exports.createAccount = (req, res) => {
    const userId = req.body.userId
    const accountName = req.body.accountName
    const bankName = req.body.bankName
    const accountNumber = req.body.accountNumber
    const routingNumber = req.body.routingNumber
    const accountType = req.body.accountType
    const paypalId = req.body.paypalId

    if (!accountType || !(accountType === 'BANK' || accountType === 'PAYPAL')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (accountType === 'BANK') {
        if (!accountName || !bankName || !accountNumber) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
            return
        }
    } else if (accountType === 'PAYPAL') {
        if (!paypalId) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
            return
        }
    }

    sequelize.transaction(async (t) => {
        let account

        if (accountType === 'BANK') {
            account = await Account.create({
                userId,
                accountName,
                bankName,
                accountNumber,
                routingNumber,
                accountType
            }, { transaction: t })
        } else if (accountType === 'PAYPAL') {
            account = await Account.create({
                userId,
                paypalId,
                accountType
            }, { transaction: t })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: account, message: 'Cuenta creada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.getAccountDetails = (req, res) => {
    const accountId = req.params.accountId

    if (!accountId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const account = await Account.findOne({ where: { id: accountId, }, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: account })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.updateAccount = (req, res) => {
    const accountId = req.body.accountId
    const accountName = req.body.accountName
    const bankName = req.body.bankName
    const accountNumber = req.body.accountNumber
    const routingNumber = req.body.routingNumber
    const accountType = req.body.accountType
    const paypalId = req.body.paypalId


    if (!accountType || !(accountType === 'BANK' || accountType === 'PAYPAL')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (accountType === 'BANK') {
        if (!accountName || !bankName || !accountNumber) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
            return
        }
    } else if (accountType === 'PAYPAL') {
        if (!paypalId) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
            return
        }
    } else {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un tipo de cuenta válido' })
        return
    }

    sequelize.transaction(async (t) => {
        let account

        if (accountType === 'BANK') {
            account = await Account.update({
                accountName, bankName, accountNumber,
                routingNumber, accountType
            }, {
                where: {
                    id: accountId,
                    accountType,
                },
                transaction: t
            })
        } else if (accountType === 'PAYPAL') {
            account = await Account.update({
                paypalId, accountType
            }, {
                where: {
                    id: accountId,
                    accountType,
                },
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: account, message: 'Cuenta actualizada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.deleteAccount = (req, res) => {
    const accountId = req.params.accountId

    if (!accountId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        Account.destroy({ where: { id: accountId, }, limit: 1, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', message: 'Cuenta eliminada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.approveAccount = (req, res) => {
    const accountId = req.params.accountId

    if (!accountId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await Account.update({
            status: 'COMPLETED',
        }, { where: { id: accountId, }, limit: 1, transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', message: 'Estado de la cuenta actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.getAllAccountsByStatusAndPage = (req, res) => {
    const status = req.params.status ? req.params.status : 'ALL'
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, accounts, pages
        if (status === 'ALL') {
            results = await Account.findAndCountAll({ transaction: t })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            accounts = await Account.findAll({
                include: [
                    { model: User }
                ],
                limit,
                offset,
                transaction: t
            })
        } else {
            results = await Account.findAndCountAll({ where: { status }, transaction: t })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            accounts = await Account.findAll({
                where: {
                    status,
                },
                include: [
                    { model: User }
                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: accounts, pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}