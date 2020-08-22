const Loan = require('../models/sequelize').Loan
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getLoansByStatus = (req, res) => {
    const state = req.params.state ? req.params.state : 'ALL'

    sequelize.transaction(async (t) => {

        let loans

        if (state === 'ALL') {
            loans = await Loan.findAll({ transaction: t })
        } else {
            loans = await Loan.findAll({
                where: {
                    bCoinState: state,
                },
                transaction: t
            })
        }

        sendJSONresponse(res, 200, { status: 200, payload: loans })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An error occurred. Please try again.' })
            return
        })
}