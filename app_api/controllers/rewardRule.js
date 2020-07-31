const RewardRule = require('../models/sequelize').RewardRule
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getRewardRule = (req, res) => {
    sequelize.transaction(async (t) => {
        let rewardRules = await RewardRule.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']],
            transaction: t
        })

        if (!rewardRules || rewardRules.length < 1) {
            const rewardRule = await RewardRule.create({
                minimumPointsToRedeem: 50,
                rewardPointsPercentage: 5,
                pointRedeemPrice: 1,
            }, { transaction: t })

            sendJSONresponse(res, 200, { status: 'OK', payload: rewardRule })
            return

        } else {

            sendJSONresponse(res, 200, { status: 'OK', payload: rewardRules[0] })
            return
        }
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateRewardRule = (req, res) => {
    const minimumPointsToRedeem = req.body.minimumPointsToRedeem
    const rewardPointsPercentage = req.body.rewardPointsPercentage
    const pointRedeemPrice = req.body.pointRedeemPrice

    if (!minimumPointsToRedeem || !rewardPointsPercentage || !pointRedeemPrice) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        const rewardRule = RewardRule.create({
            minimumPointsToRedeem,
            rewardPointsPercentage,
            pointRedeemPrice
        }, { transaction: t })

        if(!rewardRule) {
            sendJSONresponse(res, 404, {status: 'ERROR', message: 'Error al intentar crear la regla de recompensas'})
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: rewardRule, message: 'Regla de recompensas actualizada correctamente'})
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}