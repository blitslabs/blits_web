const User = require('../models/sequelize').User
const Ride = require('../models/sequelize').Ride
const Transaction = require('../models/sequelize').Transaction
const PaymentMethod = require('../models/sequelize').PaymentMethod
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')

module.exports.getDashboardData = (req, res) => {
    sequelize.transaction(async (t) => {
        const totalUsers = await User.count({ where: { accountType: 'USER ' }, transaction: t })
        const totalDrivers = await User.count({ where: { accountType: 'DRIVER ' }, transaction: t })
        const totalRides = await Ride.count({ transaction: t })
        const totalCompletedRides = await Ride.count({ where: { status: 'COMPLETED' }, transaction: t })
        const totalCancelledRides = await Ride.count({ where: { status: 'CANCELLED' }, transaction: t })
        const totalOngoingRides = await Ride.count({ where: { status: 'ONGOING' }, transaction: t })
        const totalScheduledRides = await Ride.count({ where: { scheduled: 1 }, transaction: t })
        const txsFinance = await Transaction.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('total')), 'total_amount'],
                [sequelize.fn('sum', sequelize.col('comission')), 'total_comission'],
            ],
            raw: true,
            transaction: t
        })

        // Total Cash Txs
        const cashTxs = await Transaction.count({
            include: [
                { model: PaymentMethod, where: { code: 'CASH' } }
            ],
            transaction: t
        })

        // Total Card Txs
        const cardTxs = await Transaction.count({
            include: [
                { model: PaymentMethod, where: { $or: [{ code: 'PAYPAL' }, { code: 'STRIPE' }] } }
            ],
            transaction: t
        })

        // Rides per day
        const ridesPerDay = []
        for (let i = 1; i < 8; i++) {
            const rideCount = await Ride.count({
                where: {
                    createdAt: {
                        [Op.gte]: moment().subtract(i, 'days'),
                        [Op.lte]: moment().subtract(i - 1, 'days')
                    },
                },
                transaction: t
            })
            ridesPerDay.push({ day: moment().subtract(i, 'days').day(), total: rideCount })
        }

        // Revenue per day
        const revenuePerDay = []
        for (let i = 1; i < 8; i++) {
            const revenue = await Transaction.findAll({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        [Op.gte]: moment().subtract(i, 'days'),
                        [Op.lte]: moment().subtract(i - 1, 'days')
                    },
                },
                attributes: [
                    [sequelize.fn('sum', sequelize.col('total')), 'total_amount'],
                ],
                raw: true,
                transaction: t
            })
            revenuePerDay.push({ day: moment().subtract(i, 'days').day(), total: revenue[0].total_amount ? revenue[0].total_amount : 0 })
        }



        const payload = {
            totalUsers,
            totalDrivers,
            totalRides,
            totalCompletedRides,
            totalCancelledRides,
            totalOngoingRides,
            totalScheduledRides,
            totalRevenue: txsFinance[0].total_amount != null ? txsFinance[0].total_amount : 0,
            totalComission: txsFinance[0].total_comission != null ? txsFinance[0].total_comission : 0,
            totalEarnings: txsFinance[0].total_comission != null ? parseFloat(txsFinance[0].total_comission) : 0,
            cashTxs,
            cardTxs,
            ridesPerDay: ridesPerDay.sort((a, b) => a.day - b.day),
            revenuePerDay: revenuePerDay.sort((a, b) => a.day - b.day)
        }


        sendJSONresponse(res, 200, { status: 'OK', payload })

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}