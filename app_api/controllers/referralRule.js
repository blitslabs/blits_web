const ReferralRule = require('../models/sequelize').ReferralRule
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getReferralRule = (req, res) => {
    sequelize.transaction(async (t) => {
        let referralRules = await ReferralRule.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']],
            transaction: t
        })

        if (!referralRules || referralRules.length < 1) {
            const referralRule = await ReferralRule.create({
                referralDiscountPercentage: 5,                
            }, { transaction: t })

            sendJSONresponse(res, 200, { status: 'OK', payload: referralRule })
            return

        } else {

            sendJSONresponse(res, 200, { status: 'OK', payload: referralRules[0] })
            return
        }
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateReferralRule = (req, res) => {
    const referralDiscountPercentage = req.body.referralDiscountPercentage
   

    if (!referralDiscountPercentage) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const referralRule = ReferralRule.create({
            referralDiscountPercentage
        }, { transaction: t })

        if(!referralRule) {
            sendJSONresponse(res, 404, {status: 'ERROR', message: 'Error al intentar crear la regla de referidos'})
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: referralRule, message: 'Regla de referidos actualizada correctamente'})
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}