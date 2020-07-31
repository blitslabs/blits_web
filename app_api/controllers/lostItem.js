const User = require('../models/sequelize').User
const LostItem = require('../models/sequelize').LostItem
const Picture = require('../models/sequelize').Picture
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const crypto = require('crypto')
const fs = require('fs')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')

module.exports.getAllLostItems = (req, res) => {

    sequelize.transaction(async (t) => {
        const lostItems = await LostItem.findAll({
            include: [
                { model: User }
            ],
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: lostItems })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getLostItemDetails = (req, res) => {

    const lostItemId = req.params.lostItemId

    sequelize.transaction(async (t) => {
        const lostItem = await LostItem.findOne({
            where: {
                id: lostItemId
            },
            transaction: t
        })

        if (!lostItem) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Objeto extraviado no encontrado en los registros' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: lostItem })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createLostItem = (req, res) => {
    const userId = req.user.id
    const rideId = req.body.rideId
    const itemDescription = req.body.itemDescription

    if (!userId || !rideId || !itemDescription) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
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

        const lostItem = await LostItem.create({
            userId,
            driverId: ride.driverId,
            rideId,
            itemDescription,
        }, { transaction: t })

        if (!lostItem) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No fue posible reportar el objeto perdido' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: lostItem, message: 'Objeto perdido reportado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateLostItem = (req, res) => {
    const lostItemId = req.body.lostItemId
    const fieldToChange = req.body.fieldToChange
    const newValue = req.body.newValue

    if (!lostItemId || !fieldToChange || !newValue) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const lostItem = await LostItem.findOne({
            where: {
                id: lostItemId,
            },
            transaction: t
        })

        if (!lostItem) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No se encontró el objeto perdido' })
            return
        }

        lostItem[fieldToChange] = newValue
        await lostItem.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', payload: lostItem, message: 'Objeto perdido actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deleteLostItem = (req, res) => {

    const lostItemId = req.params.lostItemId

    sequelize.transaction(async (t) => {
        const lostItem = await LostItem.findOne({
            where: {
                id: lostItemId
            },
            transaction: t
        })

        if (!lostItem) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Objeto perdido no encontrado' })
            return
        }

        await LostItem.destroy({
            where: {
                id: vehicleId
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Objeto perdido eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}