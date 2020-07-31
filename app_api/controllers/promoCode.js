
const PromoCode = require('../models/sequelize').PromoCode
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getAllPromoCodes = (req, res) => {
    sequelize.transaction(async (t) => {
        const promoCodes = await PromoCode.findAll({ transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: promoCodes })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getPromoCodeDetails = (req, res) => {
    const promoCodeId = req.params.promoCodeId

    if (!promoCodeId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {
        const promoCode = await PromoCode.findOne({ where: { id: promoCodeId }, transaction: t })

        if (!promoCode) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Código promocional no encontrado' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: promoCode })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.createPromoCode = (req, res) => {
    const code = req.body.code
    const discount = req.body.discount
    const expDate = req.body.expDate
    const limitAmount = req.body.limitAmount
    const limitRedeemTimes = req.body.limitRedeemTimes
    const targetUser = req.body.targetUser
    const zoneId = req.body.zoneId
    console.log(code)
    if (!code || !discount || !expDate || !limitAmount 
        || !limitRedeemTimes || !targetUser || !zoneId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }
    
    sequelize.transaction(async (t) => {
        
        const promoCode = await PromoCode.create({
            code, discount, expDate, limitAmount, limitRedeemTimes, targetUser, zoneId
        }, { transaction: t })

        if (!promoCode) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Error al intentar crear el código promocional' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: promoCode, message: 'Código promocional creado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updatePromoCode = (req, res) => {
    const promoCodeId = req.body.promoCodeId
    const code = req.body.code
    const discount = req.body.discount
    const expDate = req.body.expDate
    const limitAmount = req.body.limitAmount
    const limitRedeemTimes = req.body.limitRedeemTimes
    const targetUser = req.body.targetUser
    const zoneId = req.body.zoneId

    if (!promoCodeId || !code || !discount || !expDate || !limitAmount 
        || !limitRedeemTimes || !targetUser || !zoneId) 
    {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const promoCode = await PromoCode.update({
            code, discount, expDate, limitAmount, limitRedeemTimes, targetUser, zoneId
        }, {
            where: {
                id: promoCodeId
            },
            transaction: t
        })

        if (!promoCode) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Error al intentar actualizar el código promocional' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: promoCode, message: 'Código promocional actualizado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deletePromoCode = (req, res) => {
    const promoCodeId = req.params.promoCodeId

    if (!promoCodeId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        await PromoCode.destroy({
            where: {
                id: promoCodeId
            },
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Código promocional eliminado correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}