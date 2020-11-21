const Asset = require('../models/sequelize').Asset
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

const Binance = require('node-binance-api')
const binance = new Binance({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.BINANCE_API_SECRET,
})

module.exports.saveAssetPrices = (req, res) => {

    sequelize.transaction(async (t) => {
        const assets = await Asset.findAll({ raw: true, transaction: t })

        if (!assets) {
            sendJSONresponse(res, 404, { status: 'OK', message: 'No assets found' })
            return
        }

        const ticker = await binance.prices()

        for (let a of assets) {
            if(a.isStablecoin) continue

            const usdTicker = a.assetSymbol + 'USDT'
            const btcTicker = a.assetSymbol + 'BTC'
            const usdPrice = ticker[usdTicker] ? parseFloat(ticker[usdTicker]).toFixed(8) : '0.00'
            const btcPrice = ticker[btcTicker] ? parseFloat(ticker[btcTicker]).toFixed(8) : '0.00'

            await Asset.update(
                {
                    priceUSD: usdPrice,
                    priceBTC: btcPrice,
                },
                {
                    where: {
                        id: a.id,
                    },
                    transaction: t
                }
            )
        }

        sendJSONresponse(res, 200, { status: 'OK', message: 'Asset prices saved' })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again' })
            return
        })
}

module.exports.getAssets = (req, res) => {
    sequelize.transaction(async (t) => {
        const assets = await Asset.findAll({ transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: assets })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again' })
            return
        })
}