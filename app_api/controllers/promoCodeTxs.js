const User = require('../models/sequelize').User
const PromoCodeTx = require('../models/sequelize').PromoCodeTx
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getAllPromoCodeTxsByCodeAndPage = (req, res) => {
    const code = req.params.code ? req.params.code : 'ALL'
    const page = req.params.page ? parseInt(req.params.page) : 1
    const limit = 50
    let offset = 0

    if (!page || page <= 0 || isNaN(page)) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    sequelize.transaction(async (t) => {
        let results, promoCodeTxs, pages

        if (code === 'ALL') {
            results = await PromoCodeTx.findAndCount({ transaction: t })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            promoCodeTxs = await PromoCodeTx.findAll({
                include: [
                    { model: User }
                ],
                limit,
                offset,
                transaction: t
            })
        } else {
            results = await PromoCodeTx.findAndCount({
                where: {
                    code,
                },
                limit,
                offset,
                transaction: t
            })
            pages = Math.ceil(results.count / limit)
            offset = limit * (page - 1)
            promoCodeTxs = await PromoCodeTx.findAll({
                where: {
                    code
                },
                include: [
                    {model: User}
                ],
                limit,
                offset,
                transaction: t
            })
        }
               
        sendJSONresponse(res, 200, { status: 'OK', payload: promoCodeTxs })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}
