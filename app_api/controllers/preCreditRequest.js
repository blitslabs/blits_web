
const PreCreditRequest = require('../models/sequelize').PreCreditRequest
const sequelize = require('../models/sequelize').sequelize
const sendJSONresponse = require('../../utils/index').sendJSONresponse
const sendSMS = require('../../utils/sms').sendSMS

module.exports.createPreCreditRequest = (req, res) => {
    const firstName = req.body.firstName
    const secondName = req.body.secondName
    const lastName = req.body.lastName
    const secondLastName = req.body.secondLastName
    const email = req.body.email
    const phone = req.body.phone
    const gender = req.body.gender
    const dateOfBirth = req.body.dateOfBirth
    const entidadNacimiento = req.body.entidadNacimiento
    const curp = req.body.curp
    const rfc = req.body.rfc
    const calle = req.body.calle
    const numeroExt = req.body.numeroExt
    const colonia = req.body.colonia
    const municipio = req.body.municipio
    const entidadFederativa = req.body.entidadFederativa
    const postalCode = req.body.postalCode
    const creditAmount = req.body.creditAmount
    const creditType = req.body.creditType
    const propertyValue = req.body.propertyValue
    const ownsProperty = req.body.ownsProperty
    const sourceOfResources = req.body.sourceOfResources
    const unverifiableIncome = req.body.unverifiableIncome
    const verifiableIncome = req.body.verifiableIncome
    const jobDescription = req.body.jobDescription
    const nip = Math.floor(1000 + Math.random() * 9000)

    if (!firstName || !lastName || !secondLastName) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa tu nombre completo' })
        return
    }

    if (!email) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un email válido' })
        return
    }

    if (!phone) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa un número de teléfono válido' })
        return
    }

    if (!gender) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Selecciona tu sexo' })
        return
    }

    if (!dateOfBirth) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa tu fecha de nacimiento' })
        return
    }

    if (!entidadNacimiento) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Selecciona tu estado de nacimiento' })
        return
    }

    if (!curp) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa tu CURP' })
        return
    }

    if (!rfc) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa tu RFC' })
        return
    }

    if (!calle || !numeroExt || !colonia || !municipio || !entidadFederativa || !postalCode) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa los datos completos de tu domicilio' })
        return
    }

    if (!creditAmount || !creditType) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los datos requeridos de la solicitud de crédito' })
        return
    }

    if (!sourceOfResources || !unverifiableIncome || !verifiableIncome || !jobDescription) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Completa tu informacion laboral' })
        return
    }

    sequelize.transaction(async (t) => {
        const preCreditRequest = await PreCreditRequest.create({
            firstName,
            secondName,
            lastName,
            secondLastName,
            email,
            phone,
            gender,
            dateOfBirth,
            entidadNacimiento,
            curp,
            rfc,
            calle,
            numeroExt,
            colonia,
            municipio,
            entidadFederativa,
            postalCode,
            creditAmount,
            creditType,
            propertyValue,
            ownsProperty,
            sourceOfResources,
            verifiableIncome,
            unverifiableIncome,
            jobDescription,
            nip,
        }, { transaction: t })

        // SEND SMS
        const message = `Tu código NIP para Sway Lending es: ${nip}`
        const origin = 'SwayLending'

        const response = await sendSMS(phone, message, origin)

        if(response.statusCode != 200) {
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar enviar el mensaje SMS'})
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: preCreditRequest, message: 'Solicitud de crédito guardada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}



module.exports.updatePaymentSettings = (req, res) => {
    const dailyTarget = req.body.dailyTarget
    const taxPercentage = req.body.taxPercentage
    const surgeTriggerPoint = req.body.surgeTriggerPoint
    const surgePercentage = req.body.surgePercentage
    const comissionPercentage = req.body.comissionPercentage
    const currency = req.body.currency
    const bookingIdPrefix = req.body.bookingIdPrefix

    if (!dailyTarget || !taxPercentage || !surgeTriggerPoint || !surgePercentage ||
        !comissionPercentage || !currency || !bookingIdPrefix) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required parameters' })
        return
    }

    sequelize.transaction(async (t) => {

        const paymentSettings = PaymentSettings.create({
            dailyTarget, taxPercentage, surgeTriggerPoint,
            surgePercentage, comissionPercentage, currency, bookingIdPrefix
        }, { transaction: t })

        if (!paymentSettings) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'No fue posible guardar la configuración de pagos' })
            return
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: paymentSettings, message: 'Congiguración de pagos guardada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}
