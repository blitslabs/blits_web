const rp = require('request-promise')
const CryptoJS = require("crypto-js")

module.exports.sendSMS = async function send(phone, message, origin) {
    const apiKey = process.env.SMS_API_KEY
    const apiSecret = process.env.SMS_API_SECRET
    const ts = Math.floor(Date.now() / 1000)
    const nonce = Math.random().toString(36).substring(5)
    const requestMethod = 'POST'
    const requestURI = '/v2/sms'
    const requestHost = 'api.smsglobal.com'
    const requestPort = 443
    const auth = `${ts}\n${nonce}\n${requestMethod}\n${requestURI}\n${requestHost}\n${requestPort}\n\n`
    const authHash = CryptoJS.HmacSHA256(auth, apiSecret)
    const hashInBase64 = CryptoJS.enc.Base64.stringify(authHash)
    const mac = `MAC id="${apiKey}",ts="${ts}",nonce="${nonce}",mac="${hashInBase64}"`

    const params = { destination: phone, message, origin }

    const response = await rp('https://api.smsglobal.com/v2/sms', {
        method: 'POST',
        headers: {
            'Authorization': mac,
        },
        body: JSON.stringify(params)
    })

    return response
}