const ServiceVehicle = require('../models/sequelize').ServiceVehicle
const Picture = require('../models/sequelize').Picture
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const crypto = require('crypto')
const fs = require('fs')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')


module.exports.getAllServiceVehicles = (req, res) => {

    sequelize.transaction(async (t) => {
        const vehicles = await ServiceVehicle.findAll({
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicles })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getVehicleDetails = (req, res) => {

    const vehicleId = req.params.vehicleId

    sequelize.transaction(async (t) => {
        const vehicle = await ServiceVehicle.findOne({
            where: {
                id: vehicleId
            },
            transaction: t
        })

        if (!vehicle) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Vehículo de servicio no encontrado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicle })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createServiceVehicle = (req, res) => {
    const userId = req.user.id
    const vehicleName = req.body.vehicleName
    const baseFare = req.body.baseFare
    const distanceFare = req.body.distanceFare
    const seatCapacity = req.body.seatCapacity
    const description = req.body.description
    const imageData = req.body.imageData

    if (!userId || !vehicleName || !baseFare || !distanceFare || !seatCapacity || !description || !imageData) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {

        let imageBuffer, newName, imagePath, image
        imageBuffer = new Buffer(imageData, 'base64')
        newName = crypto.randomBytes(16).toString('hex')
        imagePath = './uploads/images/' + newName + '.png'

        try {
            let saveImage = new Promise((resolve, reject) => {
                fs.writeFile(imagePath, imageBuffer, (err) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(true)
                })
            })
            await saveImage
            image = await Picture.create({
                userId,
                path: imagePath
            }, { transaction: t })
        }
        catch (error) {
            console.log(error)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
            return
        }


        const vehicle = await ServiceVehicle.create({
            vehicleName,
            baseFare,
            distanceFare,
            seatCapacity,
            description,
            pictureId: image.id,
            createdBy: userId,
        }, { transaction: t })

        if (!vehicle) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No fue posible crear el vehículo de servicio' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicle, message: 'Vehiculo de servicio creado correctamente' })
        return
    })
}

module.exports.updateServiceVehicle = (req, res) => {
    const userId = req.user.id
    const vehicleId = req.body.vehicleId
    const vehicleName = req.body.vehicleName
    const baseFare = req.body.baseFare
    const distanceFare = req.body.distanceFare
    const seatCapacity = req.body.seatCapacity
    const description = req.body.description
    const imageData = req.body.imageData

    if (!userId || !vehicleId || !vehicleName || !baseFare || !distanceFare || !seatCapacity || !description) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        
        let imageBuffer, newName, imagePath, image
        
        if (imageData) {            
            imageBuffer = new Buffer(imageData, 'base64')
            newName = crypto.randomBytes(16).toString('hex')
            imagePath = './uploads/images/' + newName + '.png'

            try {
                let saveImage = new Promise((resolve, reject) => {
                    fs.writeFile(imagePath, imageBuffer, (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
                })
                await saveImage
                image = await Picture.create({
                    userId,
                    path: imagePath
                }, { transaction: t })
            }
            catch (error) {
                console.log(error)
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
                return
            }
        }

        const vehicle = await ServiceVehicle.findOne({
            where: {
                id: vehicleId,
            },
            transaction: t
        })

        if (!vehicle) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No se encontró el vehículo de servicio' })
            return
        }

        vehicle.vehicleName = vehicleName
        vehicle.baseFare = baseFare
        vehicle.distanceFare = distanceFare
        vehicle.seatCapacity = seatCapacity
        vehicle.description = description
        if(imageData) {
            vehicle.pictureId = image.id
        }
        await vehicle.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', payload: vehicle, message: 'Vehículo de servicio actualizado correctamente' })
        return
    })
}

module.exports.deteleServiceVehicle = (req, res) => {

    const vehicleId = req.params.vehicleId

    sequelize.transaction(async (t) => {
        const vehicle = await ServiceVehicle.findOne({
            where: {
                id: vehicleId
            },
            transaction: t
        })

        if (!vehicle) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Vehículo de servicio no encontrado' })
            return
        }

        await ServiceVehicle.destroy({
            where: {
                id: vehicleId
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Vehículo de servicio eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}