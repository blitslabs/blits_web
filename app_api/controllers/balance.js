const User = require('../models/sequelize').User
const Balance = require('../models/sequelize').Balance
const Transaction = require('../models/sequelize').Transaction
const PaymentMethod = require('../models/sequelize').PaymentMethod
const sendJSONresponse = require('../../utils/index.js').sendJSONresponse
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize');
const crypto = require('crypto')
const moment = require('moment')

module.exports.getBalance = (req, res) => {
    const userId = req.user.id
    const currency = req.params.currency

    if (!userId || !currency) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        const user = await User.findOne({
            where: {
                id: userId
            },
            attributes: ['id'],
            include: [
                {
                    model: Balance,
                    attributes: ['amount', 'currency'],
                    where: {
                        currency,
                    }
                }
            ],
            transaction: t
        })

        if (!user) {
            sendJSONresponse(res, 404, { message: 'User does not exist' })
            return
        }

        sendJSONresponse(res, 200, { user })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error fetching balance' })
            return
        })

}

module.exports.getAllUserBalancesByAccountTypeAndPage = (req, res) => {
    const accountType = req.params.accountType ? req.params.accountType : 'ALL'
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!accountType || !page || page <= 0) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        let results, balances, pages

        if (accountType === 'ALL') {
            results = await User.findAndCount({ transaction: t })

            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)

            balances = await User.findAll({
                attributes: ['id', 'name', 'email', 'accountType', 'phone'],
                include: [
                    { model: Balance }
                ],
                limit,
                offset,
                transaction: t
            })

        } else {
            results = await User.findAndCount({
                where: {
                    accountType,
                },
                transaction: t
            })

            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)

            balances = await User.findAll({
                where: {
                    accountType,
                },
                attributes: ['id', 'name', 'email', 'accountType', 'phone'],
                include: [
                    { model: Balance }
                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: balances, pages: pages })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getUserWallet = (req, res) => {

    const userId = req.params.userId

    if(!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        const user = await User.findOne({
            where: {
                id: userId,
            },
            attributes: ['id', 'name', 'email', 'accountType', 'phone'],
                      
            raw: true,
            transaction: t
        })

        if(!user) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'User not found'})
            return
        }

        const balance = await Balance.findOne({
            where: {
                userId,
            },
            raw: true,
            transaction: t
        })

        let txs
        if(user.accountType === 'USER') {
            txs = await Transaction.findAll({
                where: {
                    userId,
                },
                include: [
                    { model: PaymentMethod }
                ],             
               
                transaction: t
            })
        } else if (user.accountType === 'DRIVER') {
            txs = await Transaction.findAll({
                where: {
                    driverId: userId,
                },
                include: [
                    { model: PaymentMethod }
                ],
                
                transaction: t
            })
        }

        const payload = {
            ...user,
            balances: {
                ...balance
            },
            txs: [...txs]
        }

        sendJSONresponse(res, 200, { status: 'OK', payload })
        return        
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}