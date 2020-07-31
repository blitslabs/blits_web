const User = require('../models/sequelize').User
const Ride = require('../models/sequelize').Ride
const Transaction = require('../models/sequelize').Transaction
const PaymentMethod = require('../models/sequelize').PaymentMethod
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')

module.exports.getAllRidesByStatusAndPage = (req, res) => {
    const status = req.params.status ? req.params.status : 'ALL'
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, rides, pages
        if (status === 'ALL') {
            results = await Ride.findAndCount({ transaction: t })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            rides = await Ride.findAll({
                include: [
                    { model: User },
                    { model: User, as: 'Driver', where: { id: Ride.driverId } },
                    { model: Transaction, include: [{ model: PaymentMethod }] }
                ],
                limit,
                offset,
                transaction: t
            })
        } else {
            results = await Ride.findAndCount({
                where: {
                    status
                },
                transaction: t
            })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            rides = await Ride.findAll({
                where: {
                    status
                },
                include: [
                    { model: User },
                    { model: User, as: 'driver', },
                    { model: Transaction, include: [{ model: PaymentMethod }] }
                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: rides, count: results.count, pages: pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getAllRidesByStatusAndDateRangeAndPage = (req, res) => {
    const status = req.params.status ? req.params.status : 'ALL'
    const startDate = moment(req.params.startDate).toDate()
    const endDate = moment(req.params.endDate).toDate()
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0 || !startDate || !endDate) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, rides, pages
        if (status === 'ALL') {
            results = await Ride.findAndCount({
                where: {
                    createdAt: {
                        $between: [startDate, endDate]
                    }
                },
                transaction: t
            })           
           
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            rides = await Ride.findAll({
                where: {
                    createdAt: {
                        $between: [startDate, endDate]
                    }
                },
                include: [
                    { model: User },
                    { model: User, as: 'Driver', where: { id: Ride.driverId } },
                    { model: Transaction, include: [{ model: PaymentMethod }] }
                ],
                limit,
                offset,
                transaction: t
            })
        } else {
            results = await Ride.findAndCount({
                where: {
                    status,
                    createdAt: {
                        $lt: endDate,
                        $gt: startDate
                    }
                },
                transaction: t
            })
            
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            rides = await Ride.findAll({
                where: {
                    status,
                    createdAt: {
                        $between: [startDate, endDate]
                    }
                },
                include: [
                    { model: User },
                    { model: User, as: 'driver', },
                    { model: Transaction, include: [{ model: PaymentMethod }] }
                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: rides, count: results.count, pages: pages })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getUserRidesByPage = (req, res) => {
    const userId = req.params.userId
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    if (!page || page <= 0 || isNaN(page)) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {

        const user = await User.findOne({
            where: {
                id: userId
            },
            transaction: t
        })

        if (!user) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Usuario no encontrado' })
            return
        }

        let results, rides, pages

        if (user.accountType === 'USER') {
            results = await Ride.findAndCount({
                where: {
                    userId
                },
                transaction: t
            })

            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)

            rides = await Ride.findAll({
                where: {
                    userId,
                },
                include: [
                    { model: User },
                    { model: User, as: 'driver', },
                    { model: Transaction, include: [{ model: PaymentMethod }] }
                ],
                limit,
                offset,
                transaction: t
            })
        } else if (user.accountType === 'DRIVER') {
            results = await Ride.findAndCount({
                where: {
                    driverId: userId,
                },
                transaction: t
            })

            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)

            rides = await Ride.findAll({
                where: {
                    driverId: userId,
                },
                include: [
                    { model: User },
                    { model: User, as: 'driver', },
                    { model: Transaction, include: [{ model: PaymentMethod }] }
                ],
                limit,
                offset,
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: rides, pages })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getRideDetails = (req, res) => {
    const rideId = req.params.rideId

    if (!rideId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const ride = await Ride.findOne({
            where: {
                id: rideId,
            },
            include: [
                { model: User },
                { model: User, as: 'driver', },
            ],
            transaction: t
        })

        if (!ride) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Viaje no encontrado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: ride })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deleteRide = (req, res) => {
    const rideId = req.params.rideId

    if (!rideId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const ride = await Ride.findOne({
            where: {
                id: rideId
            },
            transaction: t
        })

        if (!ride) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Viaje no encontrado' })
            return
        }

        await Ride.destroy({
            where: {
                id: rideId
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Viaje eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}


// Users

// Create New Ride
module.exports.requestRide = (req, res) => {
    const userId = req.user.id
    const serviceId = req.body.serviceVehicleId
    const startLat = req.body.startLat
    const startLng = req.body.startLng
    const endLat = req.body.endLat
    const endLng = req.body.endLng
    const zoneId = req.body.zoneId
    const status = req.body.status

    if (!userId || !serviceId || !startLat || !startLng || !endLat || !endLng || !zoneId || !status) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

}

// Scheduled Rides
module.exports.updateRideDetails = (req, res) => {
    const rideId = req.params.rideId
    const fieldToChange = req.body.fieldToChange
    const newValue = req.body.newValue

    if (!rideId || !fieldToChange || !newValue) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const ride = await Ride.findOne({
            where: {
                id: rideId
            },
            transaction: t
        })

        if (!ride) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Viaje no encontrado' })
            return
        }

        ride[fieldToChange] = newValue
        await ride.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', payload: ride, message: 'Viaje actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}




// Get User's ride history


