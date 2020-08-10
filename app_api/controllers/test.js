const sendSMS = require('../../utils/sms').sendSMS
const sendEmail = require('../../utils/email').sendEmail
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.sendSMS = async (req, res) => {
    const phone = req.params.phone
    const nip = 1234
    const message = `Tu código NIP para Sway Lending es: ${nip}`
    const origin = 'SwayLending'

    const response = await sendSMS(phone, message, origin)
    console.log(response)

    sendJSONresponse(res, 200, { status: 'OK', payload: response})
    return
}

module.exports.sendEmail = async(req, res) => {
    const email = req.params.email
    const title = 'Test email'
    const nip = 1234
    sendEmail(email, title, nip)
}