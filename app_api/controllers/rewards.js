const User = require('../models/sequelize').User
const Ride = require('../models/sequelize').Ride
const RewardTx = require('../models/sequelize').RewardTx
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getAllRewardTxsByPage = (req, res) => {
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0 || isNaN(page)) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, rewardTxs, pages

        results = await RewardTx.findAndCount({ transaction: t })

        pages = Math.ceil(results.count / limit)

        offset = limit * (page - 1)

        rewardTxs = await RewardTx.findAll({
            include: [
                { model: User },
                { model: Ride }
            ],
            limit,
            offset,
            transaction: t
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: rewardTxs })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

