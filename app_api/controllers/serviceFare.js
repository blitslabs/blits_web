const ServiceFare = require('../models/sequelize').ServiceFare
const sequelize = require('../models/sequelize').sequelize
const { Op } = require('sequelize')
const crypto = require('crypto')
const fs = require('fs')
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const moment = require('moment')



module.exports.getAllServiceFarePlans = (req, res) => {

    sequelize.transaction(async (t) => {
        const serviceFares = await ServiceFare.findAll({
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: serviceFares })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getServiceFarePlan = (req, res) => {

    const serviceFareId = req.params.serviceFareId

    sequelize.transaction(async (t) => {
        const serviceFare = await ServiceFare.findOne({
            where: {
                id: serviceFareId
            },
            transaction: t
        })

        if (!serviceFare) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Plan de tarifas no encontrado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: serviceFare })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createNewServiceFarePlan = (req, res) => {
    const userId = req.user.id
    const farePlanName = req.body.farePlanName
    const startKm = req.body.startKm
    const upToKm = req.body.upToKm
    const pricePerKm = req.body.pricePerKm
    const waitingPricePerMinute = req.body.waitingPricePerMinute
    const applyPeakFare = req.body.applyPeakFare
    const applyNightFare = req.body.applyNightFare
    const nightFareStart = req.body.nightFareStart
    const nightFareEnd = req.body.nightFareEnd
    const nightFare = req.body.nightFare ? req.body.nightFare : 0
    const mondayPeakFareStartTime = req.body.mondayPeakFareStartTime
    const mondayPeakFareEndTime = req.body.mondayPeakFareEndTime
    const mondayPeakFare = req.body.mondayPeakFare ? req.body.mondayPeakFare : 0
    const tuesdayPeakFareStartTime = req.body.tuesdayPeakFareStartTime
    const tuesdayPeakFareEndTime = req.body.tuesdayPeakFareEndTime
    const tuesdayPeakFare = req.body.tuesdayPeakFare ? req.body.tuesdayPeakFare : 0
    const wednesdayPeakFareStartTime = req.body.wednesdayPeakFareStartTime
    const wednesdayPeakFareEndTime = req.body.wednesdayPeakFareEndTime
    const wednesdayPeakFare = req.body.wednesdayPeakFare ? req.body.wednesdayPeakFare : 0
    const thursdayPeakFareStartTime = req.body.thursdayPeakFareStartTime
    const thursdayPeakFareEndTime = req.body.thursdayPeakFareEndTime
    const thursdayPeakFare = req.body.thursdayPeakFare ? req.body.thursdayPeakFare : 0
    const fridayPeakFareStartTime = req.body.fridayPeakFareStartTime
    const fridayPeakFareEndTime = req.body.fridayPeakFareEndTime
    const fridayPeakFare = req.body.fridayPeakFare ? req.body.fridayPeakFare : 0
    const saturdayPeakFareStartTime = req.body.saturdayPeakFareStartTime
    const saturdayPeakFareEndTime = req.body.saturdayPeakFareEndTime
    const saturdayPeakFare = req.body.saturdayPeakFare ? req.body.saturdayPeakFare : 0
    const sundayPeakFareStartTime = req.body.sundayPeakFareStartTime
    const sundayPeakFareEndTime = req.body.sundayPeakFareEndTime
    const sundayPeakFare =req.body.sundayPeakFare ? req.body.sundayPeakFare : 0

    if (!userId || !farePlanName || !startKm || !upToKm || !pricePerKm || !waitingPricePerMinute || !applyPeakFare ||
        !applyNightFare) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {

        const serviceFare = await ServiceFare.create({
            createdBy: userId,
            farePlanName,
            startKm,
            upToKm,
            pricePerKm,
            waitingPricePerMinute,
            applyPeakFare,
            applyNightFare,
            nightFareStart,
            nightFareEnd,
            nightFare,
            mondayPeakFareStartTime,
            mondayPeakFareEndTime,
            mondayPeakFare,
            tuesdayPeakFareStartTime,
            tuesdayPeakFareEndTime,
            tuesdayPeakFare,
            wednesdayPeakFareStartTime,
            wednesdayPeakFareEndTime,
            wednesdayPeakFare,
            thursdayPeakFareStartTime,
            thursdayPeakFareEndTime,
            thursdayPeakFare,
            fridayPeakFareStartTime,
            fridayPeakFareEndTime,
            fridayPeakFare,
            saturdayPeakFareStartTime,
            saturdayPeakFareEndTime,
            saturdayPeakFare,
            sundayPeakFareStartTime,
            sundayPeakFareEndTime,
            sundayPeakFare,
        }, { transaction: t })

        if (!serviceFare) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No fue posible crear el plan tarifario' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: serviceFare, message: 'Plan tarifario creado correctamente' })
        return
    })
}

module.exports.updateServiceFarePlan = (req, res) => {
    const serviceFareId = req.body.serviceFareId
    const farePlanName = req.body.farePlanName
    const startKm = req.body.startKm
    const upToKm = req.body.upToKm
    const pricePerKm = req.body.pricePerKm
    const waitingPricePerMinute = req.body.waitingPricePerMinute
    const applyPeakFare = req.body.applyPeakFare
    const applyNightFare = req.body.applyNightFare
    const nightFareStart = req.body.nightFareStart
    const nightFareEnd = req.body.nightFareEnd
    const nightFare = req.body.nightFare ? req.body.nightFare : 0
    const mondayPeakFareStartTime = req.body.mondayPeakFareStartTime
    const mondayPeakFareEndTime = req.body.mondayPeakFareEndTime
    const mondayPeakFare = req.body.mondayPeakFare ? req.body.mondayPeakFare : 0
    const tuesdayPeakFareStartTime = req.body.tuesdayPeakFareStartTime
    const tuesdayPeakFareEndTime = req.body.tuesdayPeakFareEndTime
    const tuesdayPeakFare = req.body.tuesdayPeakFare ? req.body.tuesdayPeakFare : 0
    const wednesdayPeakFareStartTime = req.body.wednesdayPeakFareStartTime
    const wednesdayPeakFareEndTime = req.body.wednesdayPeakFareEndTime
    const wednesdayPeakFare = req.body.wednesdayPeakFare ? req.body.wednesdayPeakFare : 0
    const thursdayPeakFareStartTime = req.body.thursdayPeakFareStartTime
    const thursdayPeakFareEndTime = req.body.thursdayPeakFareEndTime
    const thursdayPeakFare = req.body.thursdayPeakFare ? req.body.thursdayPeakFare : 0
    const fridayPeakFareStartTime = req.body.fridayPeakFareStartTime
    const fridayPeakFareEndTime = req.body.fridayPeakFareEndTime
    const fridayPeakFare = req.body.fridayPeakFare ? req.body.fridayPeakFare : 0
    const saturdayPeakFareStartTime = req.body.saturdayPeakFareStartTime
    const saturdayPeakFareEndTime = req.body.saturdayPeakFareEndTime
    const saturdayPeakFare = req.body.saturdayPeakFare ? req.body.saturdayPeakFare : 0
    const sundayPeakFareStartTime = req.body.sundayPeakFareStartTime
    const sundayPeakFareEndTime = req.body.sundayPeakFareEndTime
    const sundayPeakFare =req.body.sundayPeakFare ? req.body.sundayPeakFare : 0

    if (!serviceFareId || !farePlanName || !startKm || !upToKm || !pricePerKm || !waitingPricePerMinute || !applyPeakFare ||
        !applyNightFare) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {

        let serviceFare = await ServiceFare.update({           
            farePlanName,
            startKm,
            upToKm,
            pricePerKm,
            waitingPricePerMinute,
            applyPeakFare,
            applyNightFare,
            nightFareStart,
            nightFareEnd,
            nightFare,
            mondayPeakFareStartTime,
            mondayPeakFareEndTime,
            mondayPeakFare,
            tuesdayPeakFareStartTime,
            tuesdayPeakFareEndTime,
            tuesdayPeakFare,
            wednesdayPeakFareStartTime,
            wednesdayPeakFareEndTime,
            wednesdayPeakFare,
            thursdayPeakFareStartTime,
            thursdayPeakFareEndTime,
            thursdayPeakFare,
            fridayPeakFareStartTime,
            fridayPeakFareEndTime,
            fridayPeakFare,
            saturdayPeakFareStartTime,
            saturdayPeakFareEndTime,
            saturdayPeakFare,
            sundayPeakFareStartTime,
            sundayPeakFareEndTime,
            sundayPeakFare,
        }, {
            where: {
                id: serviceFareId,
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: serviceFare, message: 'Plan tarifario actualizado correctamente' })
        return
    })
}

module.exports.deleteServiceFarePlan = (req, res) => {

    const serviceFareId = req.params.serviceFareId

    sequelize.transaction(async (t) => {
        const serviceFare = await ServiceFare.findOne({
            where: {
                id: serviceFareId
            },
            transaction: t
        })

        if (!serviceFare) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Plan tarifario no encontrado' })
            return
        }

        await ServiceFare.destroy({
            where: {
                id: serviceFareId
            },
            limit: 1,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Plan tarifario eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}