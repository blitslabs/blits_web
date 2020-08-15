const User = require('../models/sequelize').User
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const crypto = require('crypto')
const fs = require('fs')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const { AdminSettings } = require('../models/sequelize')
const emailValidator = require('email-validator')

// ADMIN KEYS
module.exports.setAdminKeys = (req, res) => {
    const SMTP_HOST = req.body.SMTP_HOST
    const SMTP_PORT = req.body.SMTP_PORT
    const SMTP_USER = req.body.SMTP_USER
    const SMTP_PASS = req.body.SMTP_PASS
    const SMS_API_KEY = req.body.SMS_API_KEY
    const SMS_API_SECRET = req.body.SMS_API_SECRET
    const CIRCULO_CREDITO_API_KEY = req.body.CIRCULO_CREDITO_API_KEY
    const CIRUCLO_CREDITO_USER = req.body.CIRUCLO_CREDITO_USER
    const NUMERO_OTORGANTE = req.body.NUMERO_OTORGANTE
    const WHATSAPP_API_KEY = req.body.WHATSAPP_API_KEY
    const WHATSAPP_PHONE_NUMBER = req.body.WHATSAPP_PHONE_NUMBER
    const GOOGLE_CLIENT_EMAIL = req.body.GOOGLE_CLIENT_EMAIL
    const GOOGLE_SPREADSHEET_ID = req.body.GOOGLE_SPREADSHEET_ID
    const GOOGLE_SHEET_ID = req.body.GOOGLE_SHEET_ID

    sequelize.transaction(async (t) => {
        const [adminSettings, created] = await AdminSettings.findOrCreate({
            defaults: {
                SMTP_HOST,
                SMTP_PORT,
                SMTP_USER,
                SMTP_PASS,
                SMS_API_KEY,
                SMS_API_SECRET,
                CIRCULO_CREDITO_API_KEY,
                CIRUCLO_CREDITO_USER,
                NUMERO_OTORGANTE,
                WHATSAPP_API_KEY,
                WHATSAPP_PHONE_NUMBER,
                GOOGLE_CLIENT_EMAIL,
                GOOGLE_SPREADSHEET_ID,
                GOOGLE_SHEET_ID
            },
            where: {
                id: 1,
            },
            transaction: t
        })

        if (!created) {
            adminSettings.SMTP_HOST = SMTP_HOST
            adminSettings.SMTP_PORT = SMTP_PORT
            adminSettings.SMTP_USER = SMTP_USER
            adminSettings.SMTP_PASS = SMTP_PASS
            adminSettings.SMS_API_KEY = SMS_API_KEY
            adminSettings.SMS_API_SECRET = SMS_API_SECRET
            adminSettings.CIRCULO_CREDITO_API_KEY = CIRCULO_CREDITO_API_KEY
            adminSettings.CIRUCLO_CREDITO_USER = CIRUCLO_CREDITO_USER
            adminSettings.NUMERO_OTORGANTE = NUMERO_OTORGANTE
            adminSettings.WHATSAPP_API_KEY = WHATSAPP_API_KEY
            adminSettings.WHATSAPP_PHONE_NUMBER = WHATSAPP_PHONE_NUMBER
            adminSettings.GOOGLE_CLIENT_EMAIL = GOOGLE_CLIENT_EMAIL
            adminSettings.GOOGLE_SPREADSHEET_ID = GOOGLE_SPREADSHEET_ID
            adminSettings.GOOGLE_SHEET_ID = GOOGLE_SHEET_ID

            await adminSettings.save({ transaction: t })
        }

        sendJSONresponse(res, 200, { status: 'OK', message: 'Admin Keys updated!' })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}


module.exports.setupAdminGoogleSheet = async (req, res) => {
    // Spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID)

    // User service account creds
    await doc.useServiceAccountAuth(require('../config/google_sheets_auth.json'))

    // Load document properties and worksheets
    await doc.loadInfo()

    // Create Sheet
    const sheet = await doc.addSheet({
        headerValues: [
            'Fecha', 'email', 'Teléfono Móvil', 'Nombre del solicitante', 'Buro (archivo PDF)'
        ]
    })
}

module.exports.adminSignup = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const rpassword = req.body.rpassword

    // check if all field were sent
    if (!email || !password || !rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos' })
        return
    }

    // check that the passwords are the same
    if (password !== rpassword) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Las contraseñas ingresadas no coinciden' })
        return
    }

    if (!emailValidator.validate(email)) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ingresa un email válido' })
        return
    }

    sequelize.transaction(async function (t) {

        // Check if there are admin accounts
        const adminAccountsExist = await User.count({
            where: {
                accountType: 'ADMIN'
            },
            transaction: t 
        })
        
        if(adminAccountsExist > 0) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'An Admin Account already exists'})
            return
        }

        const [user, created] = await User.findOrCreate({
            where: {
                email,
            },
            defaults: {
                email,
                accountType: 'ADMIN'
            },
            transaction: t
        })

        if (!created) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'El email ingresado ya se encuentra registrado' })
            return
        }

        user.setPassword(password)
        await user.save({ transaction: t })

        sendJSONresponse(res, 200, { status: 'OK', message: 'Cuenta creada correctamente'})
        return
    })
        .catch(function (err) {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Error al intentar realizar la operación' })
            return
        })

}