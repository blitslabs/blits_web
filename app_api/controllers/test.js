const sendSMS = require('../../utils/sms').sendSMS
const sendEmail = require('../../utils/email').sendEmail
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const sendWhatsappMessage = require('../../utils/whatsapp').sendWhatsappMessage
const sendWACreditResponse = require('../../utils/whatsapp').sendWACreditResponse
const { GoogleSpreadsheet } = require('google-spreadsheet');

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

    if (!phone) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
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

// Create Service Account
// Active Google Sheets API
// Download Key
// Get Sheet ID
// Share Sheet with service Account

module.exports.googleSheets = async (req, res) => {
    // Spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)
    // User service account creds
    await doc.useServiceAccountAuth(require('../config/google_sheets_auth.json'))

    // Load document properties and worksheets
    await doc.loadInfo()

    // const sheet = await doc.sheetsByIndex[0]

    const sheet = await doc.addSheet({ headerValues: ['Fecha', 'email', 'Teléfono Móvil', 'Nombre del solicitante', 'Buro (archivo PDF)']})
    console.log(sheet)
    console.log(sheet.title)
    console.log(sheet.rowCount)
    await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' })
}