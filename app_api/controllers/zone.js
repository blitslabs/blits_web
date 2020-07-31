const Zone = require('../models/sequelize').Zone
const ZonePoint = require('../models/sequelize').ZonePoint
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')


module.exports.getAllZones = (req, res) => {

    sequelize.transaction(async (t) => {
        const zones = await Zone.findAll({
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: zones })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getZoneDetails = (req, res) => {

    const zoneId = req.params.zoneId

    sequelize.transaction(async (t) => {
        const zone = await Zone.findOne({
            where: {
                id: zoneId
            },
            include: [
                { model: ZonePoint }
            ],
            transaction: t
        })

        if (!zone) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Zone not found' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: zone })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createZone = (req, res) => {
    const userId = req.user.id
    const name = req.body.name
    const country = req.body.country
    const state = req.body.state
    const city = req.body.city
    const currency = req.body.currency
    const status = req.body.status
    const zonePoints = req.body.zonePoints
    
    if (!name || !country || !state || !currency || !status || !zonePoints) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const zone = await Zone.create({
            name,
            country,
            state,
            city,
            currency,          
            status,
           
        }, { transaction: t })

        for(let point of zonePoints) {
            await ZonePoint.create({
                zoneId: zone.id,
                lat: point.lat,
                lng: point.lng,               
            }, { transaction: t})
        }

        if(!zone) {
            sendJSONresponse(res, 404, {status: 'ERROR', message: 'No fue posible crear la zona de operación'})
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: zone, message: 'Zona de operación creada correctamente'})
        return
    })
}

module.exports.updateZone = (req, res) => {
    const zoneId = req.body.zoneId
    const name = req.body.name
    const country = req.body.country
    const state = req.body.state
    const city = req.body.city
    const currency = req.body.currency
    const zonePoints = req.body.zonePoints

    if (!name || !country || !state || !city || !currency || !zonePoints) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const zone = await Zone.findOne({
            where: {
                id: zoneId
            },            
            transaction: t
        })

        if(!zone) {
            sendJSONresponse(res, 404, {status: 'ERROR', message: 'Zona de operación no encontrada'})
            return
        }

        zone.name = name
        zone.country = country
        zone.state = state
        zone.city = city
        zone.currency = currency
        await zone.save({ transaction: t })

        await ZonePoint.destroy({
            where: {
                zoneId,
            },
            transaction: t
        })

        for(let point of zonePoints) {
            await ZonePoint.create({
                zoneId: zone.id,
                lat: point.lat,
                lng: point.lng,               
            }, { transaction: t})
        }                

        sendJSONresponse(res, 200, { status: 'OK', payload: zone, message: 'Zona de operación actualizada'})
        return
    })
}

module.exports.deleteZone = (req, res) => {

    const zoneId = req.params.zoneId

    if(!zoneId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        const zone = await Zone.findOne({
            where: {
                id: zoneId
            },
            transaction: t
        })

        if (!zone) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Zona de operación no encontrada' })
            return
        }

        await Zone.destroy({
            where: {
                id: zoneId
            },
            limit: 1,
            transaction: t
        })

        await ZonePoint.destroy({
            where: {
                zoneId,
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Zona de operación eliminada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}