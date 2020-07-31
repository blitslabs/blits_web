const User = require('../models/sequelize').User
const BusinessSettings = require('../models/sequelize').BusinessSettings
const Picture = require('../models/sequelize').Picture
const sequelize = require('../models/sequelize').sequelize
const crypto = require('crypto')
const fs = require('fs')
const sendJSONresponse = require('../../utils/index').sendJSONresponse

module.exports.getBusinessSettings = (req, res) => {
    sequelize.transaction(async (t) => {
        const settings = await BusinessSettings.findAll({ limit: 1, order: [['createdAt', 'DESC']], transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: settings[0] })
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}

module.exports.updateBusinessSettings = (req, res) => {
    const userId = req.user.id
    const businessName = req.body.businessName
    const businessLogo = req.body.businessLogo
    const businessIcon = req.body.businessIcon
    const copyrightContent = req.body.copyrightContent
    const playStoreUserApp = req.body.playStoreUserApp
    const playStoreDriverApp = req.body.playStoreDriverApp
    const appStoreDriverApp = req.body.appStoreDriverApp
    const appStoreUserApp = req.body.appStoreUserApp
    const distanceUnit = req.body.distanceUnit
    const waitingTimeOut = req.body.waitingTimeOut
    const providerSearchRadius = req.body.providerSearchRadius
    const emergencyNumber = req.body.emergencyNumber
    const contactNumber = req.body.contactNumber
    const email = req.body.email
    const scheduleTriggerTime = req.body.scheduleTriggerTime
    const driverPhoneValidation = req.body.driverPhoneValidation
    const driverEmailValidation = req.body.driverEmailValidation
    const userPhoneValidation = req.body.userPhoneValidation
    const userEmailValidation = req.body.userEmailValidation
    const rideCancellationTime = req.body.rideCancellationTime
    const rideCancellationCharges = req.body.rideCancellationCharges
    const allowChat = req.body.allowChat
    const socialLoginUser = req.body.socialLoginUser
    const socialLoginDriver = req.body.socialLoginDriver

    if(!userId || !businessName || !copyrightContent || !playStoreUserApp || !playStoreDriverApp ||
        !playStoreDriverApp || !appStoreDriverApp || !appStoreUserApp || !distanceUnit || !waitingTimeOut ||
        !providerSearchRadius || !emergencyNumber || !contactNumber || !contactNumber || !contactNumber ||
        !contactNumber || !email || !scheduleTriggerTime || !driverPhoneValidation || !driverEmailValidation ||
        !userPhoneValidation || !userEmailValidation || !rideCancellationTime || !rideCancellationCharges ||
        !allowChat || !socialLoginUser || !socialLoginDriver
    ) 
    {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ingresa todos los campos requeridos'})
        return
    }

    sequelize.transaction(async (t) => {
        let businessLogoImageId, businessIconImageId
        let imageBuffer, newName, imagePath

        if (businessLogo) {
            imageBuffer = new Buffer(businessLogo, 'base64')
            newName = crypto.randomBytes(16).toString('hex')
            imagePath = './uploads/images/' + newName + '.png'

            try {
                let saveImage = new Promise((resolve, reject) => {
                    fs.writeFile(imagePath, imageBuffer, (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
                })
                await saveImage
                businessLogoImageId = await Picture.create({
                    userId,
                    path: imagePath
                }, { transaction: t })
            }
            catch (error) {
                console.log(error)
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
                return
            }
        }

        if (businessIcon) {
            imageBuffer = new Buffer(businessIcon, 'base64')
            newName = crypto.randomBytes(16).toString('hex')
            imagePath = './uploads/images/' + newName + '.png'

            try {
                let saveImage = new Promise((resolve, reject) => {
                    fs.writeFile(imagePath, imageBuffer, (err) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(true)
                    })
                })
                await saveImage

                businessIconImageId = await Picture.create({
                    userId,
                    path: imagePath
                }, { transaction: t })

            }
            catch (error) {
                console.log(error)
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar guardar la imagen' })
                return
            }
        }
        const prevSettings = await BusinessSettings.findAll({ limit: 1, order: [['createdAt', 'DESC']], transaction: t })
        const settings = await BusinessSettings.create({
            businessName,
            businessLogoImageId: businessLogoImageId != null ? businessLogoImageId.id : prevSettings[0].businessLogoImageId,
            businessIconImageId: businessIconImageId != null ? businessIconImageId.id : prevSettings[0].businessIconImageId,
            copyrightContent,
            playStoreUserApp, playStoreDriverApp, appStoreDriverApp, appStoreUserApp,
            distanceUnit, waitingTimeOut, providerSearchRadius, emergencyNumber, contactNumber,
            email, scheduleTriggerTime, driverPhoneValidation, driverEmailValidation,
            userPhoneValidation, userEmailValidation, rideCancellationTime, rideCancellationCharges, allowChat, socialLoginUser,
            socialLoginDriver,
        }, { transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', payload: settings, message: 'Configuración actualizada correctamente' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Occurió un error al intentar realizar la acción' })
            return
        })
}
