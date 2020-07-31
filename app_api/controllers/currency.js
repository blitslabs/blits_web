const Currency = require('../models/sequelize').Currency
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getAllCurrencies = (req, res) => {
    sequelize.transaction(async (t) => {
        const currencies = await Currency.findAll({ transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: currencies })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.addCurrency = (req, res) => {
    const name = req.body.name
    const symbol = req.body.symbol

    if (!name || !symbol) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        const currency = await Currency.create({
            name, symbol
        }, { transaction: t })

        if (!currency) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Error al intentar agregar la divisa' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: currency, message: 'Divisa agregada correctamente' })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.deleteCurrency = (req, res) => {
    const symbol = req.params.symbol

    if (!symbol) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        await Currency.destroy({
            where: {
                symbol,
            },
            limit: 1
        })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Divisa eliminada correctamente' })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}