
const PaymentSettings = require('../models/sequelize').PaymentSettings
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getPaymentSettings = (req, res) => {
    sequelize.transaction(async (t) => {
        const settings = await PaymentSettings.findAll({ limit: 1, order: [['createdAt', 'DESC']], transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: settings[0] })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updatePaymentSettings = (req, res) => {
    const dailyTarget = req.body.dailyTarget
    const taxPercentage = req.body.taxPercentage
    const surgeTriggerPoint = req.body.surgeTriggerPoint
    const surgePercentage = req.body.surgePercentage
    const comissionPercentage = req.body.comissionPercentage
    const currency = req.body.currency
    const bookingIdPrefix = req.body.bookingIdPrefix

    if (!dailyTarget || !taxPercentage || !surgeTriggerPoint || !surgePercentage ||
        !comissionPercentage || !currency || !bookingIdPrefix) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {

        const paymentSettings = PaymentSettings.create({
            dailyTarget, taxPercentage, surgeTriggerPoint,
            surgePercentage, comissionPercentage, currency, bookingIdPrefix
        }, { transaction: t })

        if(!paymentSettings) {
            sendJSONresponse(res, 404 ,{ status: 'ERROR', message: 'No fue posible guardar la configuración de pagos'})
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: paymentSettings, message: 'Congiguración de pagos guardada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}
