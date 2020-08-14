const sendSMS = require('../../utils/sms').sendSMS
const sendEmail = require('../../utils/email').sendEmail
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const sendWhatsappMessage = require('../../utils/whatsapp').sendWhatsappMessage
const sendWACreditResponse = require('../../utils/whatsapp').sendWACreditResponse

module.exports.sendSMS = async (req, res) => {
    const phone = req.params.phone
    const nip = 1234
    const message = `Tu código NIP para Sway Lending es: ${nip}`
    const origin = 'SwayLending'

    const response = await sendSMS(phone, message, origin)
    console.log(response)

    sendJSONresponse(res, 200, { status: 'OK', payload: response })
    return
}

module.exports.sendEmail = async (req, res) => {
    const email = req.params.email
    const title = 'Test email'
    const nip = 1234
    sendEmail(email, title, nip)
}

module.exports.sendWhatsapp = async (req, res) => {
    const phone = req.params.phone

    let response
    try {
        response = await sendWhatsappMessage(phone, 'Test Message!')
    } catch (e) {
        console.log(e)
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar enviar el mensaje' })
        return
    }

    if (response.success != true) {
        sendJSONresponse(res, 200, { status: 'ERROR', message: 'Error sending whatsapp message' })
        return
    }

    sendJSONresponse(res, 200, { status: 'OK', message: 'Whatsapp message sent!' })
    return
}

module.exports.sendWACreditResponse = async (req, res) => {
    const phone = req.params.phone

    if(!phone) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    const data = {
        phone,
        primerNombre: 'Juan',
        apellidoPaterno: 'Pérez',
        rfc: 'RFCTEST',
        resultado: 'PRE-APROBADO-TEST',
        monto: '$900,000.00',
        enlaceHistorial: 'https://my.swaydo.mx/b/test.pdf'
    }

    let response
    try {
        response = await sendWACreditResponse(data)
    } catch (e) {
        console.log(e)
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar enviar el mensaje' })
        return
    }
    
    if (response.success != true) {
        console.log(response)
        sendJSONresponse(res, 200, { status: 'ERROR', message: 'Error sending whatsapp message' })
        return
    }

    sendJSONresponse(res, 200, { status: 'OK', message: 'Whatsapp message sent!' })
    return
}