const sendSMS = require('../../utils/sms').sendSMS
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.sendSMS = async (req, res) => {
    const phone = '5527691883'
    const nip = 1234
    const message = `Tu código NIP para Sway Lending es: ${nip}`
    const origin = 'SwayLending'

    const response = await sendSMS(phone, message, origin)
    console.log(response)

    sendJSONresponse(res, 200, { status: 'OK', payload: response})
    return
}