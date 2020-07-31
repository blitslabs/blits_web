const User = require('../models/sequelize').User
const ServiceVehicle = require('../models/sequelize').ServiceVehicle
const UserVehicle = require('../models/sequelize').UserVehicle
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const crypto = require('crypto')
const fs = require('fs')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')

module.exports.updateUserVehicle = (req, res) => {
    const userId = req.body.userId
    const serviceVehicleId = req.body.serviceVehicleId
    const vehiclePlates = req.body.vehiclePlates
    const vehicleModel = req.body.vehicleModel
    const vehicleColor = req.body.vehicleColor
    const vehicleOwner = req.body.vehicleOwner

    if (!userId || !serviceVehicleId || !vehiclePlates || !vehicleModel || !vehicleColor || !vehicleOwner) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const [userVehicle, created] = await UserVehicle.findOrCreate({
            where: {
                userId
            },
            defaults: {
                userId,
                serviceVehicleId,
                vehiclePlates,
                vehicleModel,
                vehicleColor,
                vehicleOwner
            },
            transaction: t
        })

        if (!created) {
            userVehicle.serviceVehicleId = serviceVehicleId
            userVehicle.vehiclePlates = vehiclePlates
            userVehicle.vehicleModel = vehicleModel
            userVehicle.vehicleColor = vehicleColor
            userVehicle.vehicleOwner = vehicleOwner
            await userVehicle.save({ transaction: t })
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: userVehicle, message: 'Vehículo del conductor actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.getUserVehicle = (req, res) => {
    const userId = req.params.userId

    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const userVehicle = await UserVehicle.findOne({
            where: {
                userId,
            },
            include: [
                { model: User },
                { model: ServiceVehicle }
            ],
            transaction: t
        })

        if (!userVehicle) {
            sendJSONresponse(res, 200, { status: 'OK', payload: userVehicle, message: 'El usuario no tiene un vehículo asignado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: userVehicle })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación' })
            return
        })
}

module.exports.deleteUserVehicle = (req, res) => {
    const userVehicleId = req.params.userVehicleId

    if(!userVehicleId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        await UserVehicle.destroy({
            where: {
                id: userVehicleId,
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Vehículo eliminado correctamente'})
        return
    }) 
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la operación'})
            return
        })
}