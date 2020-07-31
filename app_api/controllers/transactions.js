const User = require('../models/sequelize').User
const Transaction = require('../models/sequelize').Transaction
const Ride = require('../models/sequelize').Ride
const PaymentMethod = require('../models/sequelize').PaymentMethod
const sequelize = require('../models/sequelize').sequelize
const moment = require('moment')
const sendJSONresponse = require('../../utils/index').sendJSONresponse


module.exports.getAllTxsByPage = (req, res) => {

    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        let result, txs, pages
        result = await Transaction.findAndCount({ transaction: t })
        pages = Math.ceil(result.count / limit)
        offset = limit * (page - 1)
        txs = await Transaction.findAll({
            include: [
                { model: User },
                { model: User, as: 'driver' },
                { model: PaymentMethod }
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: txs, pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getDriverStats = (req, res) => {
    const userId = req.params.userId

    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const txs = await Transaction.findAll({
            where: {
                driverId: userId,
            },
            attributes: [
                [sequelize.fn('sum', sequelize.col('total')), 'total_amount'],
                [sequelize.fn('sum', sequelize.col('comission')), 'total_comission'],
            ],
            raw: true,
            transaction: t
        })

        // const rides = await Ride.findAll({
        //     where: {
        //         driverId: userId,
        //     },
        //     attributes: [
        //         'status',
        //         [sequelize.fn('count', sequelize.col('status')), 'totalStatus']
        //     ],
        //     group: ['status'],
        //     raw: true,
        //     transaction: t
        // })

        const rides = await Ride.findAll({
            where: {
                driverId: userId,
            },
            raw: true,
            transaction: t
        })

        const payload = {
            totalRevenue: txs[0].total_amount,
            totalComission: txs[0].total_comission,
            totalEarnings: parseFloat(txs[0].total_amount) - parseFloat(txs[0].total_comission),
            totalRides: rides.length,
            totalCancelledRides: (rides.filter((r) => r.status == 'CANCELLED')).length
        }

        sendJSONresponse(res, 200, { status: 'OK', payload })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getGlobalStatsByPeriod = (req, res) => {

    const period = req.params.period ? req.params.period : 'all'

    if (!period) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (!(period === 'day' || period === 'month' || period === 'year' || period === 'all')) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un periodo válido' })
        return
    }

    sequelize.transaction(async (t) => {
        const currentDate = moment()
        let periodDate

        if (period === 'day') {
            periodDate = currentDate.subtract('1', 'days')
        } else if (period === 'month') {
            periodDate = currentDate.subtract('30', 'days')
        } else if (period === 'year') {
            periodDate = currentDate.subtract('365', 'days')
        }

        let txs, rides
        if (period === 'all') {
            txs = await Transaction.findAll({
                where: {
                    status: 'COMPLETED',
                },
                attributes: [
                    [sequelize.fn('sum', sequelize.col('total')), 'total_amount'],
                    [sequelize.fn('sum', sequelize.col('comission')), 'total_comission'],
                ],
                raw: true,
                transaction: t
            })

            rides = await Ride.findAll({
                where: {
                    status: 'COMPLETED',
                },
                raw: true,
                transaction: t
            })
        } else {
            txs = await Transaction.findAll({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        $gte: periodDate
                    }
                },
                attributes: [
                    [sequelize.fn('sum', sequelize.col('total')), 'total_amount'],
                    [sequelize.fn('sum', sequelize.col('comission')), 'total_comission'],
                ],
                raw: true,
                transaction: t
            })

            rides = await Ride.findAll({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        $gte: periodDate
                    }
                },
                raw: true,
                transaction: t
            })
        }

        const payload = {
            totalRevenue: txs[0].total_amount != null ? parseFloat(txs[0].total_amount) : 0,
            totalComission: txs[0].total_comission != null ? parseFloat(txs[0].total_comission) : 0,
            totalEarnings: txs[0].total_comission != null ? parseFloat(txs[0].total_amount) - parseFloat(txs[0].total_comission) : 0,
            totalRides: rides.length,
            totalCancelledRides: (rides.filter((r) => r.status == 'CANCELLED')).length
        }

        sendJSONresponse(res, 200, { status: 'OK', payload })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getGlobalStatsByRange = (req, res) => {
    const startDate = req.params.startDate
    const endDate = req.params.endDate

    if (!startDate || !endDate) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {       

        let txs, rides

        txs = await Transaction.findAll({
            where: {
                status: 'COMPLETED',
                createdAt: {
                    $between: [startDate, endDate]
                }
            },
            attributes: [
                [sequelize.fn('sum', sequelize.col('total')), 'total_amount'],
                [sequelize.fn('sum', sequelize.col('comission')), 'total_comission'],
            ],
            raw: true,
            transaction: t
        })

        rides = await Ride.findAll({
            where: {
                status: 'COMPLETED',
                createdAt: {
                    $between: [startDate, endDate]
                }
            },
            raw: true,
            transaction: t
        })


        const payload = {
            totalRevenue: txs[0].total_amount != null ? parseFloat(txs[0].total_amount) : 0,
            totalComission: txs[0].total_comission != null ? parseFloat(txs[0].total_comission) : 0,
            totalEarnings: txs[0].total_comission != null ? parseFloat(txs[0].total_amount) - parseFloat(txs[0].total_comission) : 0,
            totalRides: rides.length,
            totalCancelledRides: (rides.filter((r) => r.status == 'CANCELLED')).length
        }

        sendJSONresponse(res, 200, { status: 'OK', payload })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}