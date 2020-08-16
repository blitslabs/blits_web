const NewsletterLead = require('../models/sequelize').NewsletterLead
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.subscribeEmail = (req, res) => {
    const email = req.body.email

    if (!email) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Enter a valid email' })
        return
    }

    sequelize.transaction(async (t) => {
        const [lead, created] = await NewsletterLead.findOrCreate({
            where: {
                email,
            },
            defaults: {
                email,
            },
            transaction: t
        })

        if(!created) {
            sendJSONresponse(res, 200, { status: 'OK', message: 'Thanks! You are already subscribed!'})
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', message: 'Thanks for subscribing!' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again!' })
        })
}