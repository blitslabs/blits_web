const VehicleMapping = require('../models/sequelize').VehicleMapping
const ServiceVehicle = require('../models/sequelize').ServiceVehicle
const ServiceFare = require('../models/sequelize').ServiceFare
const Zone = require('../models/sequelize').Zone
const Picture = require('../models/sequelize').Picture
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getAllVehicleMappings = (req, res) => {
    sequelize.transaction(async (t) => {
        const vehicleMappings = await VehicleMapping.findAll({
            include: [
                { model: ServiceVehicle },
                { model: ServiceFare },
                { model: Zone }
            ],
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicleMappings })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getVehicleMappingDetails = (req, res) => {

    const vehicleMappingId = req.params.vehicleMappingId

    if (!vehicleMappingId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const vehicleMapping = await VehicleMapping.findOne({
            where: {
                id: vehicleMappingId
            },
            transaction: t
        })

        if (!vehicleMapping) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Mapeo de vehículo no encontrado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicleMapping })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createVehicleMapping = (req, res) => {
    const serviceVehicleId = req.body.serviceVehicleId
    const serviceFareId = req.body.serviceFareId
    const zoneId = req.body.zoneId
    const description = req.body.description

    if (!serviceVehicleId || !serviceFareId || !zoneId || !description) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const vehicleMapping = await VehicleMapping.create({
            serviceVehicleId,
            serviceFareId,
            zoneId,
            description
        }, { transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicleMapping, message: 'Vinculación de vehículo creada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateVehicleMapping = (req, res) => {
    const vehicleMappingId = req.body.vehicleMappingId
    const serviceVehicleId = req.body.serviceVehicleId
    const serviceFareId = req.body.serviceFareId
    const zoneId = req.body.zoneId
    const description = req.body.description

    if (!vehicleMappingId || !serviceVehicleId || !serviceFareId || !zoneId || !description) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const vehicleMapping = await VehicleMapping.update({
            serviceVehicleId,
            serviceFareId,
            zoneId,
            description
        }, {
            where: {
                id: vehicleMappingId
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicleMapping, message: 'Mapeo de vehículo actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deleteVehicleMapping = (req, res) => {
    const vehicleMappingId = req.params.vehicleMappingId

    if (!vehicleMappingId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await VehicleMapping.destroy({
            where: {
                id: vehicleMappingId
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'ERROR', message: 'Mapeo de vehículo eliminado correctamente'})
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}